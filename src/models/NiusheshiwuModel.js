import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 牛舍事务
const NiusheshiwuModel = sequelize.define('NiusheshiwuModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
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
	niushemianji: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '牛舍面积'
	},
	shiwuleixing: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '事务类型'
	},
	niusheweizhi: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '牛舍位置'
	},
	shiwuriqi: {
		type: DataTypes.DATEONLY,
		allowNull: true,
		get() {
            return moment(this.getDataValue('shiwuriqi')).format('YYYY-MM-DD')
        },
		defaultValue: new Date(),
		comment: '事务日期'
	},
	shiwuneirong: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '事务内容'
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
	tableName: 'niusheshiwu'
})

export default NiusheshiwuModel
