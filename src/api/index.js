import { Router } from 'express'
import UsersController from './Users'
import FileController from './File'
import ConfigController from './Config'
import CommonController from './Common'
import YonghuController from './Yonghu'
import NiushexinxiController from './Niushexinxi'
import NiuqunxinxiController from './Niuqunxinxi'
import NiusheshiwuController from './Niusheshiwu'
import RichangzhaoguController from './Richangzhaogu'
import XiaoshouxinxiController from './Xiaoshouxinxi'
import CangkuxinxiController from './Cangkuxinxi'
import RukuxinxiController from './Rukuxinxi'
import ChukuxinxiController from './Chukuxinxi'
import SiwangxinxiController from './Siwangxinxi'
import SyslogController from './Syslog'
import SystemnoticeController from './Systemnotice'

export default ({ config, db }) => {
	let api = Router()

	api.use('/users', UsersController({ config, db }))

	api.use('/file', FileController({ config, db }))

	api.use('/config', ConfigController({ config, db }))

	api.use('/', CommonController({ config, db }))

	api.use('/yonghu', YonghuController({ config, db }))

	api.use('/niushexinxi', NiushexinxiController({ config, db }))

	api.use('/niuqunxinxi', NiuqunxinxiController({ config, db }))

	api.use('/niusheshiwu', NiusheshiwuController({ config, db }))

	api.use('/richangzhaogu', RichangzhaoguController({ config, db }))

	api.use('/xiaoshouxinxi', XiaoshouxinxiController({ config, db }))

	api.use('/cangkuxinxi', CangkuxinxiController({ config, db }))

	api.use('/rukuxinxi', RukuxinxiController({ config, db }))

	api.use('/chukuxinxi', ChukuxinxiController({ config, db }))

	api.use('/siwangxinxi', SiwangxinxiController({ config, db }))

	api.use('/syslog', SyslogController({ config, db }))

	api.use('/systemnotice', SystemnoticeController({ config, db }))

	return api
}
