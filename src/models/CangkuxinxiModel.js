import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 仓库信息
const CangkuxinxiModel = sequelize.define('CangkuxinxiModel', {
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
	zhuyishixiang: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '注意事项'
	},
	wupinshuliang: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '物品数量'
	},
	shiyongfanwei: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '使用范围'
	},
	wupinshuoming: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '物品说明'
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
	tableName: 'cangkuxinxi'
})

export default CangkuxinxiModel
