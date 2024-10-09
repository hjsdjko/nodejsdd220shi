import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 牛舍信息
const NiushexinxiModel = sequelize.define('NiushexinxiModel', {
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
	niusheweizhi: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '牛舍位置'
	},
	niusheshuoming: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '牛舍说明'
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
	tableName: 'niushexinxi'
})

export default NiushexinxiModel
