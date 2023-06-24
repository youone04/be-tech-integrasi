
export default (db , DataTypes) => {
    const User = db.define("user", {
        nama : {
            type: DataTypes.STRING
        },
        email : {
            type: DataTypes.STRING,
            unique: true
        },
        password : {
            type: DataTypes.TEXT
        }
    },{
        freezeTableName: true
    });

    return User;
}