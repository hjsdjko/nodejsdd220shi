import { version } from '../../package.json'
import { Router } from 'express'
import { Sequelize, Op,literal, QueryTypes } from 'sequelize'
import sequelize from '../models/sequelize'
import toRes from '../lib/toRes'
import SiwangxinxiModel from '../models/SiwangxinxiModel'
import util from '../lib/util'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import ConfigModel from '../models/ConfigModel'
import https from 'https'
import request from 'request'
import qs from 'querystring'
import path from 'path'
import fs from 'fs'
import config from '../config.json'
const redis = require('redis')




export default ({ config, db }) => {
	let api = Router()


	// 分页接口（后端）
	api.get('/page', async (req, res) => {

		try {

			let page = parseInt(req.query.page) || 1
			let limit = parseInt(req.query.limit) || 10
			let sort = req.query.sort || 'id'
			let order = req.query.order || 'asc'

			let where = {}
			let niuqunbianhao = req.query.niuqunbianhao
			if (niuqunbianhao) {

				if (niuqunbianhao.indexOf('%') != -1) {
					where.niuqunbianhao = {
						[Op.like]: niuqunbianhao
					}
				} else {
					where.niuqunbianhao = {
						[Op.eq]: niuqunbianhao
					}
				}
			}
			let niuqunmingcheng = req.query.niuqunmingcheng
			if (niuqunmingcheng) {

				if (niuqunmingcheng.indexOf('%') != -1) {
					where.niuqunmingcheng = {
						[Op.like]: niuqunmingcheng
					}
				} else {
					where.niuqunmingcheng = {
						[Op.eq]: niuqunmingcheng
					}
				}
			}
			let niuqunpinzhong = req.query.niuqunpinzhong
			if (niuqunpinzhong) {

				if (niuqunpinzhong.indexOf('%') != -1) {
					where.niuqunpinzhong = {
						[Op.like]: niuqunpinzhong
					}
				} else {
					where.niuqunpinzhong = {
						[Op.eq]: niuqunpinzhong
					}
				}
			}
			let siwangleixing = req.query.siwangleixing
			if (siwangleixing) {

				if (siwangleixing.indexOf('%') != -1) {
					where.siwangleixing = {
						[Op.like]: siwangleixing
					}
				} else {
					where.siwangleixing = {
						[Op.eq]: siwangleixing
					}
				}
			}
			let siwangshuliang = req.query.siwangshuliang
			if (siwangshuliang) {

				if (siwangshuliang.indexOf('%') != -1) {
					where.siwangshuliang = {
						[Op.like]: siwangshuliang
					}
				} else {
					where.siwangshuliang = {
						[Op.eq]: siwangshuliang
					}
				}
			}
			let dengjiriqi = req.query.dengjiriqi
			if (dengjiriqi) {

				if (dengjiriqi.indexOf('%') != -1) {
					where.dengjiriqi = {
						[Op.like]: dengjiriqi
					}
				} else {
					where.dengjiriqi = {
						[Op.eq]: dengjiriqi
					}
				}
			}
			let xinxishuoming = req.query.xinxishuoming
			if (xinxishuoming) {

				if (xinxishuoming.indexOf('%') != -1) {
					where.xinxishuoming = {
						[Op.like]: xinxishuoming
					}
				} else {
					where.xinxishuoming = {
						[Op.eq]: xinxishuoming
					}
				}
			}
			let yuangonggonghao = req.query.yuangonggonghao
			if (yuangonggonghao) {

				if (yuangonggonghao.indexOf('%') != -1) {
					where.yuangonggonghao = {
						[Op.like]: yuangonggonghao
					}
				} else {
					where.yuangonggonghao = {
						[Op.eq]: yuangonggonghao
					}
				}
			}

			let orders =[]
			const sortList = sort.split(",")
			const orderList = order.split(",")
			sortList.forEach((item, index) => {
				orders.push([item,orderList[index]])
			  });
			let result = await SiwangxinxiModel.findAndCountAll({
				order: [orders],
				where,
				offset: (page - 1) * limit,
				limit
			})
			
			result.currPage = page
			result.pageSize = limit

			toRes.page(res, 0, result)
		} catch(err) {
			res.status(500).render(err)
			//toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	  // 分页接口（前端）
	api.get('/lists', async (req, res) => {

		try {
			let result = await SiwangxinxiModel.findAll()
			toRes.record(res, 0, result)
		} catch(err) {
			
			toRes.session(res, 401, '您的权限不够！', '', 200)
		}
	})

	// 查询单条记录（前端）
	api.get('/query', async (req, res) => {

		try {
			const dictionary = {};
			for (let key in req.query) {
				dictionary[key] = req.query[key];
			}
			let result = await SiwangxinxiModel.findOne({where:dictionary})
			
			toRes.record(res, 0, result)
		} catch(err) {
			res.status(500).render(err)
		}
	})

    // 分页接口（前端）
	api.get('/list', async (req, res) => {

		try {

			let page = parseInt(req.query.page) || 1
			let limit = parseInt(req.query.limit) || 10
			let sort = req.query.sort || 'id'
			let order = req.query.order || 'asc'

			let where = {}
			let niuqunbianhao = req.query.niuqunbianhao
			if (niuqunbianhao) {

				if (niuqunbianhao.indexOf('%') != -1) {
					where.niuqunbianhao = {
						[Op.like]: niuqunbianhao
					}
				} else {
					where.niuqunbianhao = {
						[Op.eq]: niuqunbianhao
					}
				}
			}
			let niuqunmingcheng = req.query.niuqunmingcheng
			if (niuqunmingcheng) {

				if (niuqunmingcheng.indexOf('%') != -1) {
					where.niuqunmingcheng = {
						[Op.like]: niuqunmingcheng
					}
				} else {
					where.niuqunmingcheng = {
						[Op.eq]: niuqunmingcheng
					}
				}
			}
			let siwangleixing = req.query.siwangleixing
			if (siwangleixing) {

				if (siwangleixing.indexOf('%') != -1) {
					where.siwangleixing = {
						[Op.like]: siwangleixing
					}
				} else {
					where.siwangleixing = {
						[Op.eq]: siwangleixing
					}
				}
			}
			let yuangonggonghao = req.query.yuangonggonghao
			if (yuangonggonghao) {

				if (yuangonggonghao.indexOf('%') != -1) {
					where.yuangonggonghao = {
						[Op.like]: yuangonggonghao
					}
				} else {
					where.yuangonggonghao = {
						[Op.eq]: yuangonggonghao
					}
				}
			}


			let orders =[]
			const sortList = sort.split(",")
			const orderList = order.split(",")
			sortList.forEach((item, index) => {
				orders.push([item,orderList[index]])
			  });
			let result = await SiwangxinxiModel.findAndCountAll({
				order: [orders],
				where,
				offset: (page - 1) * limit,
				limit
			})
			
			result.currPage = page
			result.pageSize = limit

			toRes.page(res, 0, result)
		} catch(err) {
			
			toRes.session(res, 401, '您的权限不够！', '', 200)
		}
	})


	// 保存接口（后端）
	api.post('/save',(req,res,next)=>{
		try{
			req.method1 = path.join(__filename.split('nodejsdd220shi').pop(),'save');
			req.operation = '保存死亡信息';
			next();
		}catch(err){}
	}, async (req, res) => {

		try {

			Object.keys(req.body).forEach(item=>{
				if(req.body[item] == '')  delete req.body[item]
				if(req.body[item] == '' && item == 'sfsh')  req.body[item] = '待审核'
			})



			const userinfo = await SiwangxinxiModel.create(req.body)

			if (userinfo === null) {

				toRes.session(res, -1, '添加失败！')
			} else {

				toRes.session(res, 0, '添加成功！')
			}
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

    // 保存接口（前端）
	api.post('/add',(req,res,next)=>{
		try{
			req.method1 = path.join(__filename.split('nodejsdd220shi').pop(),'add');
			req.operation = '新增死亡信息';
			next();
		}catch(err){}
	}, async (req, res) => {

		try {

			Object.keys(req.body).forEach(item=>{
				if(req.body[item] == '')  delete req.body[item]
				if(req.body[item] == '' && item == 'sfsh')  req.body[item] = '待审核'
			})

			if (jwt.decode(req.headers.token) == null) {
				toRes.session(res, 401, '请登录后再操作', '', 401)
			}





			const userinfo = await SiwangxinxiModel.create(req.body)

			if (userinfo === null) {

				toRes.session(res, -1, '添加失败！')
			} else {

				toRes.session(res, 0, '添加成功！')
			}
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 更新接口
	api.post('/update',(req,res,next)=>{
		try{
			req.method1 = path.join(__filename.split('nodejsdd220shi').pop(),'update');
			req.operation = '更新死亡信息';
			next();
		}catch(err){}
	}, async (req, res) => {

		try {


			await SiwangxinxiModel.update(req.body, {
				where: {
				  id: req.body.id || 0
				}
			})


			toRes.session(res, 0, '编辑成功！')
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 删除接口
	api.post('/delete',(req,res,next)=>{
		try{
			req.method1 = path.join(__filename.split('nodejsdd220shi').pop(),'delete');
			req.operation = '删除死亡信息';
			next();
		}catch(err){}
	}, async (req, res) => {

		try {

			await SiwangxinxiModel.destroy({
				where: {
				  id: {
					[Op.in]: req.body
				  }
				}
			})

			toRes.session(res, 0, '删除成功！')
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 详情接口（后端）
	api.all('/info/:id', async (req, res) => {

		try {


			toRes.record(res, 0, await SiwangxinxiModel.findOne({ where: { id: req.params.id } }))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})


    // 详情接口（前端）
	api.all('/detail/:id', async (req, res) => {

		try {


			toRes.record(res, 0, await SiwangxinxiModel.findOne({ where: { id: req.params.id } }))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 获取需要提醒的记录数接口
	api.get('/remind/:columnName/:type', async (req, res) => {

        let where = ' 1=1 '

		try {

			let sql = 'SELECT 0 AS count'
			
			if (req.params.type == 1) {
				if (req.query.remindstart) sql = "SELECT COUNT(*) AS count FROM siwangxinxi WHERE " + where + " AND " + req.params.columnName + " >= '" + req.query.remindstart + "'"
				if (req.query.remindend) sql = "SELECT COUNT(*) AS count FROM siwangxinxi WHERE " + where + " AND " + req.params.columnName + " <= '" + req.query.remindend + "'"

				if (req.query.remindstart && req.query.remindend) {
					sql = "SELECT COUNT(*) AS count FROM siwangxinxi WHERE " + where + " AND " + req.params.columnName + " >= '" + req.query.remindstart + "' AND " + req.params.columnName + " <= '" + req.query.remindend + "'"
				}
			}

			if (req.params.type == 2) {
				if (req.query.remindstart) {
					let remindStart = util.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM siwangxinxi WHERE " + where + " AND " + req.params.columnName + " >= '" + remindStart + "'"
				}
				if (req.query.remindend) {
					let remindEnd = util.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM siwangxinxi WHERE " + where + " AND " + req.params.columnName + " <= '" + remindEnd + "'"
				}

				if (req.query.remindstart && req.query.remindend) {
					let remindStart = util.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd")
					let remindEnd = util.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM siwangxinxi WHERE " + where + " AND " + req.params.columnName + " >= '" + remindStart + "' AND " + req.params.columnName + " <= '" + remindEnd + "'"
				}
			}

			const results = await sequelize.query(sql, {
				plain: true,
				raw: true,
				type: QueryTypes.SELECT
			})

			toRes.count(res, 0, results.count)
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})










	// 分组统计接口
	api.get('/group/:columnName', async (req, res) => {

		try {

			let sql = ""
			let columnName = req.params.columnName
			// let tableName = "siwangxinxi"
			let where = " WHERE 1 = 1 "
			sql = "SELECT COUNT(*) AS total, " + columnName + " FROM siwangxinxi " + where + " GROUP BY " + columnName 
			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 统计指定字段
	api.get('/value/:xColumnName/:yColumnName', async (req, res) => {

		try {

			let sql = ""
			let xColumnName = req.params.xColumnName
			let yColumnName = req.params.yColumnName
			let where = " WHERE 1 = 1 "
			if ("siwangxinxi" == "orders") {
				where += " AND status IN ('已支付', '已发货', '已完成') ";
			}

			sql = "SELECT " + xColumnName + ", SUM(" + yColumnName + ") AS total FROM siwangxinxi " + where + " GROUP BY " + xColumnName + " DESC"
			
			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// (按值统计）时间统计类型(多)
	api.get('/valueMul/:xColumnName', async (req, res) => {

		try {	
			let sql = ""
			let xColumnName = req.params.xColumnName
			let yColumnName = req.query.yColumnNameMul
			let tableName = "siwangxinxi"
			let where = " WHERE 1 = 1 "
			const promises = yColumnName.split(',').map(async(item)=>{
				sql = "SELECT " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY " + xColumnName;
				const results = await sequelize.query(sql, {
					plain: false,
					raw: true,
					type: QueryTypes.SELECT
				});
				return results;
			})
            	
			toRes.record(res, 0, await Promise.all(promises))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// (按值统计）时间统计类型(多)
	api.get('/valueMul/:xColumnName/:timeStatType', async (req, res) => {

		try {	
			let sql = ""
			let xColumnName = req.params.xColumnName
			let yColumnName = req.query.yColumnNameMul
			let timeStatType = req.params.timeStatType
			let tableName = "siwangxinxi"
			let where = " WHERE 1 = 1 "

			const promises = yColumnName.split(',').map(async(item)=>{
				sql = "SELECT " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY " + xColumnName;
				if (config.dbConnection.dbtype.toLowerCase() == "mysql") {
            	    if (timeStatType == "日")
            	        sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d') " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d')";
            	    if (timeStatType == "月")
            	        sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m') " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m')";
            	    if (timeStatType == "年")
            	        sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y') " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y')";
            	} else {
            	    if (timeStatType == "日")
            	        sql = "SELECT DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120) " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120)";
            	    if (timeStatType == "月")
            	        sql = "SELECT DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120) " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120)";
            	    if (timeStatType == "年")
            	        sql = "SELECT DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120) " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120)";
            	}
				const results = await sequelize.query(sql, {
					plain: false,
					raw: true,
					type: QueryTypes.SELECT
				});
				return results;
			})
            	
			toRes.record(res, 0, await Promise.all(promises))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 按日期统计
	api.get('/value/:xColumnName/:yColumnName/:timeStatType', async (req, res) => {

		try {
			
			let sql = ""
			let xColumnName = req.params.xColumnName
			let yColumnName = req.params.yColumnName
			let timeStatType = req.params.timeStatType
			let tableName = "siwangxinxi"
			let where = " WHERE 1 = 1 "
			if ("siwangxinxi" == "orders") {
				where += " AND status IN ('已支付', '已发货', '已完成') ";
			}

            if (config.dbConnection.dbtype.toLowerCase() == "mysql") {
                if (timeStatType == "日")
                    sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d')";
                if (timeStatType == "月")
                    sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m')";
                if (timeStatType == "年")
                    sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y')";
            } else {
                if (timeStatType == "日")
                    sql = "SELECT DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120)";
                if (timeStatType == "月")
                    sql = "SELECT DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120)";
                if (timeStatType == "年")
                    sql = "SELECT DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120)";
            }
			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})


	// 总数接口
	api.get('/count', async (req, res) => {

		try {
			let where = {}
			var niuqunbianhao = req.query.niuqunbianhao
			if (niuqunbianhao) {

				if (niuqunbianhao.indexOf('%') != -1) {
					where.niuqunbianhao = {
						[Op.like]: niuqunbianhao
					}
				} else {
					where.niuqunbianhao = {
						[Op.eq]: niuqunbianhao
					}
				}
			}
			var niuqunmingcheng = req.query.niuqunmingcheng
			if (niuqunmingcheng) {

				if (niuqunmingcheng.indexOf('%') != -1) {
					where.niuqunmingcheng = {
						[Op.like]: niuqunmingcheng
					}
				} else {
					where.niuqunmingcheng = {
						[Op.eq]: niuqunmingcheng
					}
				}
			}
			var siwangleixing = req.query.siwangleixing
			if (siwangleixing) {

				if (siwangleixing.indexOf('%') != -1) {
					where.siwangleixing = {
						[Op.like]: siwangleixing
					}
				} else {
					where.siwangleixing = {
						[Op.eq]: siwangleixing
					}
				}
			}
			var yuangonggonghao = req.query.yuangonggonghao
			if (yuangonggonghao) {

				if (yuangonggonghao.indexOf('%') != -1) {
					where.yuangonggonghao = {
						[Op.like]: yuangonggonghao
					}
				} else {
					where.yuangonggonghao = {
						[Op.eq]: yuangonggonghao
					}
				}
			}

			const count = await SiwangxinxiModel.count({where});

			toRes.record(res, 0, count)
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})













	return api
}
