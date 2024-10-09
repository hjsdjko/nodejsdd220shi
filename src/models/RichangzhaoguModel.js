import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 日常照顾
const RichangzhaoguModel = sequelize.define('RichangzhaoguModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	niuqunbianhao: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '牛群编号'
	},
	niuqunmingcheng: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '牛群名称'
	},
	niuqunshuliang: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '牛群数量'
	},
	niuqunpinzhong: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '牛群品种'
	},
	guanlileixing: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '管理类型'
	},
	guanlineirong: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '管理内容'
	},
	guanliriqi: {
		type: DataTypes.DATEONLY,
		allowNull: true,
		get() {
            return moment(this.getDataValue('guanliriqi')).format('YYYY-MM-DD')
        },
		defaultValue: new Date(),
		comment: '管理日期'
	},
	yuangonggonghao: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '员工工号'
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
	tableName: 'richangzhaogu'
})

export default RichangzhaoguModel
