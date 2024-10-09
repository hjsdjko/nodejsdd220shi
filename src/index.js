import http from 'http'
import path from 'path'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import expressSession from 'express-session'
import expressJWT from 'express-jwt'
import initializeDb from './db'
import middleware from './middleware'
import api from './api'
import config from './config.json'
import util from './lib/util'
import jwt from 'jsonwebtoken'
import SyslogModel from '../src/models/SyslogModel'
const url = require('url');

let app = express()
app.server = http.createServer(app)

// app.use(morgan('dev'))

app.use((req, res, next) => {
	const start = process.hrtime(); // 获取当前时间
	if(['/update','/add','/save','/shBatch','/delete','/alipay','/importExcel','/compose'].some(element => req.url.includes(element))){
		let data = '';
		req.on('data', (chunk) => {
			console.log("data:"+chunk);
			data += chunk;
		});
		
		res.on('finish', () => {
			const end = process.hrtime(start); // 获取请求响应时间
			try{
				let pString =''
				// console.log("req.method:"+JSON.stringify(url.parse(req.url, true).query))
				if(req.method=="POST"){
					pString =JSON.stringify(JSON.parse(data))
				}else{
					pString =JSON.stringify(url.parse(req.url, true).query)
				}
				const params= {
					'time':parseInt(end[1] / 1000000),
					'params':pString,
					'method':req.method1,
					'ip':req.ip.replace("::ffff:", ""),
					'operation':req.operation,
					'username':jwt.decode(req.headers.token).username
				}
				SyslogModel.create(params)
			  }catch(err){
				console.log(`err:`,err);
			  }
		});
	};
	next();
  });

app.use(cors({
	exposedHeaders: config.corsHeaders
}))

app.use(bodyParser.json({
	limit : config.bodyLimit
}))

app.use(expressSession({
	secret: config.sessionSecret,
	resave: false,
	saveUninitialized: true
}))

app.use('/' + config.projectName, express.static(path.join(__dirname, 'views')))

app.use(expressJWT({
	secret: config.jwtSecret,
	algorithms: ["HS256"],
	credentialsRequired: true,
	getToken (req) {
		
		return util.isNothing(req.headers.token) ? null : req.headers.token
	},
	requestProperty: 'xiezn'
}).unless({
	path: [
		{
			url: /.*\/(login|faceLogin|register|upload|download|resetPass|autoSort|list|sendemail|notify|update|security|sendsms)$/,
			methods: ['GET', 'POST']
		},
		{
			url: /.*\/(config|option|follow|sh|remind|cal|group|value|news|info|detail|forum|updateBrowseDuration|sendemail\/password)\/.*/,
			methods: ['GET', 'POST']
		}
	]
}))

app.use((err, req, res, next) => {

	if (err.name === 'UnauthorizedError') {
		res.status(200).json({
			code: 401,
			msg: '您的权限不够！'
		})
	}
})

initializeDb( db => {

	app.use(middleware({ config, db }))

	app.use('/' + config.projectName, api({ config, db }))

	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`)
	})
})

export default app
