var DataTypes = require("sequelize").DataTypes;
var _absent_form = require("./absent_form");
var _account = require("./account");
var _batch = require("./batch");
var _cchapter = require("./cchapter");
var _center = require("./center");
var _class_ = require("./class");
var _ctopic = require("./ctopic");
var _duty = require("./duty");
var _examination = require("./examination");
var _expense = require("./expense");
var _fees_form = require("./fees_form");
var _group = require("./group");
var _leave_form = require("./leave_form");
var _lform = require("./lform");
var _notification_status = require("./notification_status");
var _result = require("./result");
var _results = require("./results");
var _rscreen = require("./rscreen");
var _srecord = require("./srecord");
var _student = require("./student");
var _subject = require("./subject");
var _teacher = require("./teacher");
var _teacher_attendance = require("./teacher_attendance");
var _timetable = require("./timetable");
var _transaction = require("./transaction");
var _u_role = require("./u_role");
var _user = require("./user");

function initModels(sequelize) {
  var absent_form = _absent_form(sequelize, DataTypes);
  var account = _account(sequelize, DataTypes);
  var batch = _batch(sequelize, DataTypes);
  var cchapter = _cchapter(sequelize, DataTypes);
  var center = _center(sequelize, DataTypes);
  var class_ = _class_(sequelize, DataTypes);
  var ctopic = _ctopic(sequelize, DataTypes);
  var duty = _duty(sequelize, DataTypes);
  var examination = _examination(sequelize, DataTypes);
  var expense = _expense(sequelize, DataTypes);
  var fees_form = _fees_form(sequelize, DataTypes);
  var group = _group(sequelize, DataTypes);
  var leave_form = _leave_form(sequelize, DataTypes);
  var lform = _lform(sequelize, DataTypes);
  var notification_status = _notification_status(sequelize, DataTypes);
  var result = _result(sequelize, DataTypes);
  var results = _results(sequelize, DataTypes);
  var rscreen = _rscreen(sequelize, DataTypes);
  var srecord = _srecord(sequelize, DataTypes);
  var student = _student(sequelize, DataTypes);
  var subject = _subject(sequelize, DataTypes);
  var teacher = _teacher(sequelize, DataTypes);
  var teacher_attendance = _teacher_attendance(sequelize, DataTypes);
  var timetable = _timetable(sequelize, DataTypes);
  var transaction = _transaction(sequelize, DataTypes);
  var u_role = _u_role(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  teacher.belongsTo(class, { as: "class", foreignKey: "class_id"});
  class.hasMany(teacher, { as: "teachers", foreignKey: "class_id"});

  return {
    absent_form,
    account,
    batch,
    cchapter,
    center,
    class_,
    ctopic,
    duty,
    examination,
    expense,
    fees_form,
    group,
    leave_form,
    lform,
    notification_status,
    result,
    results,
    rscreen,
    srecord,
    student,
    subject,
    teacher,
    teacher_attendance,
    timetable,
    transaction,
    u_role,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
