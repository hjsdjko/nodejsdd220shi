import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 牛群信息
const NiuqunxinxiModel = sequelize.define('NiuqunxinxiModel', {
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
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '牛群数量'
	},
	niuqunpinzhong: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '牛群品种'
	},
	niushebianhao: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '牛舍编号'
	},
	niushemingcheng: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '牛舍名称'
	},
	siyangshuoming: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '饲养说明'
	},
	zhuyishixiang: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '注意事项'
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
	tableName: 'niuqunxinxi'
})

export default NiuqunxinxiModel
