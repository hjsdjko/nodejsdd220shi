import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 系统日志
const SyslogModel = sequelize.define('SyslogModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	username: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '用户名'
	},
	operation: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '用户操作'
	},
	method: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '请求方法'
	},
	params: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '请求参数'
	},
	time: {
		type: DataTypes.BIGINT,
		defaultValue: 0,
		allowNull: true,
		comment: '请求时长(毫秒)'
	},
	ip: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: 'IP地址'
	},
	addtime: {
  		type: DataTypes.DATE,
  		defaultValue: DataTypes.NOW,
    	allowNull: false,
    	get() {
            return moment(this.getDataValue('addtime')).format('YYYY-MM-DD HH:mm:ss')
        },
		comment: '添加时间'
	}
}, {
	timestamps: false,
	freezeTableName: true,
	tableName: 'syslog'
})

export default SyslogModel
