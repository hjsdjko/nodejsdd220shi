import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 入库信息
const RukuxinxiModel = sequelize.define('RukuxinxiModel', {
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
	rukuriqi: {
		type: DataTypes.DATEONLY,
		allowNull: true,
		get() {
            return moment(this.getDataValue('rukuriqi')).format('YYYY-MM-DD')
        },
		defaultValue: new Date(),
		comment: '入库日期'
	},
	wupinshuliang: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '入库数量'
	},
	rukushuoming: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '入库说明'
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
	tableName: 'rukuxinxi'
})

export default RukuxinxiModel
