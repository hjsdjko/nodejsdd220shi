import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 销售信息
const XiaoshouxinxiModel = sequelize.define('XiaoshouxinxiModel', {
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
	niuqunpinzhong: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '牛群品种'
	},
	xiaoshoujiage: {
		type: DataTypes.DOUBLE,
		defaultValue: 0,
		allowNull: true,
		comment: '销售价格'
	},
	xiaoshoushuliang: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '销售数量'
	},
	xiaoshoujine: {
		type: DataTypes.DOUBLE,
		defaultValue: 0,
		allowNull: true,
		comment: '销售金额'
	},
	xiaoshouriqi: {
		type: DataTypes.DATEONLY,
		allowNull: true,
		get() {
            return moment(this.getDataValue('xiaoshouriqi')).format('YYYY-MM-DD')
        },
		defaultValue: new Date(),
		comment: '销售日期'
	},
	maijiaxinxi: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '买家信息'
	},
	xiaoshoushuoming: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '销售说明'
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
	tableName: 'xiaoshouxinxi'
})

export default XiaoshouxinxiModel
