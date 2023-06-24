export default (db, DataTypes) => {
    const ModelDataBarang = db.define("data_barang", {
        foto_barang: {
            type: DataTypes.STRING
        },
        nama_barang: {
            type: DataTypes.STRING,
            unique: true
        },
        harga_beli: {
            type: DataTypes.INTEGER
        },
        harga_jual: {
            type: DataTypes.INTEGER
        },
        stok: {
            type: DataTypes.INTEGER
        },
    }, {
        freezeTableName: true
    });

    return ModelDataBarang;
}