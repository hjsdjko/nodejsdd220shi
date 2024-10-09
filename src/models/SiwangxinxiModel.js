import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 死亡信息
const SiwangxinxiModel = sequelize.define('SiwangxinxiModel', {
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
	siwangleixing: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '死亡类型'
	},
	siwangshuliang: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '死亡数量'
	},
	dengjiriqi: {
		type: DataTypes.DATEONLY,
		allowNull: true,
		get() {
            return moment(this.getDataValue('dengjiriqi')).format('YYYY-MM-DD')
        },
		defaultValue: new Date(),
		comment: '登记日期'
	},
	xinxishuoming: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '信息说明'
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
	tableName: 'siwangxinxi'
})

export default SiwangxinxiModel
