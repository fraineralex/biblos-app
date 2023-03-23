//Relationships
/* Ref: user.roleId > rol.id 
Ref: book.authorId > user.id
Ref: book.genderId > gender.id
Ref: book.editorialId > editorial.id
Ref: invoice.userId > user.id
Ref: invoice.bookId <> book.id
Ref: cart.userId > user.id
Ref: cart.bookId <> book.id */

const User = require('../models/User')
const Cart = require('../models/Cart')
const Editorial = require('../models/Editorial')
const Gender = require('../models/Gender')
const Invoice = require('../models/Invoice')
const Book = require('../models/Book')
const Role = require('../models/Role')

const RelationShips = () => {
    User.belongsTo(Role, { constraint: true, onDelete: "CASCADE"},);
    Role.hasMany(User);

    Book.belongsTo(User, { constraint: true, onDelete: "CASCADE", as: 'author'},);
    User.hasMany(Book, {foreignKey: 'authorId'});

    Book.hasMany(User, { constraint: true, onDelete: "CASCADE"},);
    User.hasMany(Book);

    Book.belongsTo(Gender, { constraint: true, onDelete: "CASCADE"},);
    Gender.hasMany(Book);

    Book.belongsTo(Editorial, { constraint: true, onDelete: "CASCADE"},);
    Editorial.hasMany(Book);

    Invoice.belongsTo(User, { constraint: true, onDelete: "CASCADE"},);
    User.hasMany(Invoice);

    Invoice.hasMany(Book, { constraint: true, onDelete: "CASCADE"},);
    Book.hasMany(Invoice);

    Cart.belongsTo(User, { constraint: true, onDelete: "CASCADE"},);
    User.hasMany(Cart);

    Cart.hasMany(Book, { constraint: true, onDelete: "CASCADE"},);
    Book.hasMany(Cart);
}

module.exports = RelationShips