import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 出库信息
const ChukuxinxiModel = sequelize.define('ChukuxinxiModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	wupinmingcheng: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '物品名称'
	},
	wupinfenlei: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '物品分类'
	},
	guigexinghao: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '规格型号'
	},
	chukuriqi: {
		type: DataTypes.DATEONLY,
		allowNull: true,
		get() {
            return moment(this.getDataValue('chukuriqi')).format('YYYY-MM-DD')
        },
		defaultValue: new Date(),
		comment: '出库日期'
	},
	wupinshuliang: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '出库数量'
	},
	chukushuoming: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '出库说明'
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
	tableName: 'chukuxinxi'
})

export default ChukuxinxiModel
