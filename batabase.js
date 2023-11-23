const mySQL = require('mysql2/promise');
const pool = mySQL.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Sr0583261045',
    database: 'information_system'
})
const checkDBConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("db connected");
        connection.release();
        return true;
    } catch (error) {
        const message = error.message + "\n" + "can`t connect to db";
        console.log(message);
        return false;
    }
}


const newUser = async (name, password, email,) => {
    try {
        const sql = `
     INSERT INTO users (name, password,email)
     VALUES (?,?,?)`
        const [{ affectedRows, insertId }] = await pool.query(sql, [name, password, email])

        if (!affectedRows) return -1


        console.log(`
        name: ${name} 
        password: ${password} 
        email: ${email} 
        `);

        return insertId

    } catch (error) {
        return error.message
    }
}

const updateUserData = async (name, ...args) => {
    const [arr] = [...args]
    if (!arr) {
        return console.log('not');
    } else {
        console.log('ok');
    }
    const keys = Object.keys(arr);
    const values = Object.values(arr);

    let toSql = '';
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] === 'name' || keys[i] === 'password') {
            return console.log('או מפתח אי אפשר לשנות שם או סיסמא');
        }

        toSql += ` ${keys[i]} = "${values[i]}" `
        if (i !== keys.length - 1) {
            toSql += ','
        }
    };

    console.log(keys);
    console.log(values);
    const sql = `
            UPDATE users
            SET ${toSql}
            WHERE name = ?
            `;

    console.log(sql);
    const [{ affectedRows }] = await pool.query(sql, [name]);
    if (affectedRows) return console.log('updated');
    console.log(name + " " + args);
}
const getIntoUser = async (name) => {
    try {
        const sql = `
    SELECT id_user,
           username,
           name,
           email,
           phone,
           address
    FROM users
    WHERE name = "${name}"
    `
        const [[res]] = await pool.query(sql);
        console.log(res);
        return res;
    } catch (error) {
        return error.message
    }
}
// updateUserData('shimy')
// getInto('shimy')
// updateUserData('shimy',{username:"shishi",phone:5001234005,address:'fffffaa'})
// updateUserData('sa')

// newUser('shimy',123123)
const newPost = async (id_user, title, body) => {
    try {
        const sql = `
        INSERT INTO posts (id_user, title, body)
        VALUES (?,?,?)`
        const [{ affectedRows, insertId }] = await pool.query(sql, [id_user, title, body])

        if (!affectedRows) {
            console.log(-1);
            return -1
        }


        console.log(`
        id_user: ${id_user} 
        title: ${title} 
        body: ${body} 
        `);

        return insertId

    } catch (error) {
        return error.message
    }
}
// newPost(1,'title-2','body-2')
const getPosts = async (id_user, id = null) => {
    let toSql = "";
    if (id) {
        toSql = `AND id = "${id}"`
    }
    try {
        const sql = `
            SELECT *
            FROM posts
            WHERE id_user = "${id_user}" 
            ${toSql}
            `
        const [res] = await pool.query(sql);
        console.log(res);
        return res;
    } catch (error) {
        return error.message
    }
}


const newComments = async (id_post, name, email,body) => {
    try {
        const sql = `
        INSERT INTO comments (id_post, name, email,body)
        VALUES (?,?,?,?)`
        const [{ affectedRows, insertId }] = await pool.query(sql, [id_post, name, email,body])

        if (!affectedRows) {
            console.log(-1);
            return -1
        }


        console.log(`
        id_post: ${id_post} 
        name: ${name} 
        email: ${email} 
        body: ${body} 
        `);

        return insertId

    } catch (error) {
        return error.message
    }
}
// newPost(1,'title-2','body-2')
const getComments = async (id_post, id_comment = null) => {
    let toSql = "";
    if (id_comment) {
        toSql = `AND id_comment = "${id_comment}"`
    }
    try {
        const sql = `
            SELECT *
            FROM comments
            WHERE id_post = "${id_post}" 
            ${toSql}
            `
        const [res] = await pool.query(sql);
        console.log(res);
        return res;
    } catch (error) {
        return error.message
    }
}


const newTodos = async (id_user, title, completed) => {
    try {
        const sql = `
        INSERT INTO todos (id_user, title,completed)
        VALUES (?,?,?)
        `
        const [{ affectedRows, insertId }] = await pool.query(sql, [id_user, title, completed])

        if (!affectedRows) {
            console.log(-1);
            return -1
        }


        console.log(`
        id_user: ${id_user} 
        title: ${title} 
        completed: ${completed} 
        `);

        return insertId

    } catch (error) {
        return error.message
    }
}
// newPost(1,'title-2','body-2')
const getTodos = async (id_user, id_todo = null) => {
    let toSql = "";
    if (id_todo) {
        toSql = `AND id_todo = "${id_todo}"`
    }
    try {
        const sql = `
            SELECT *
            FROM todos
            WHERE id_user = "${id_user}" 
            ${toSql}
            `
        const [res] = await pool.query(sql);
        console.log(res);
        return res;
    } catch (error) {
        return error.message
    }
}

// getComments(1,1)

module.exports ={
    checkDBConnection
}
