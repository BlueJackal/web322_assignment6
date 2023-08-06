/* / / / / / / / / / / / / / / / / / / /
        Our custom sequelize code
/ / / / / / / / / / / / / / / / / / / */

const Sequelize = require('sequelize');

//set up sequelize point to our postgres database
var sequelize = new Sequelize('ugjdfzsw', 'ugjdfzsw', '3cUEo6Xsl3eKR2AAYyMKwAv7yZcGm2Yd', {
    host: 'rajje.db.elephantsql.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
    query: { raw: true }
});


//Creating our data models
var Student = sequelize.define('Student', {
    studentNum: Sequelize.INTEGER,
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressProvince: Sequelize.STRING,
    TA: Sequelize.BOOLEAN,
    status: Sequelize.STRING
});

var Course = sequelize.define('Course', {
    couseId: Sequelize.INTEGER,
    courseCode: Sequelize.STRING
});

Course.hasMany(Student);


//updating existing collegeData.js functions

function initialize() {
    return new Promise((resolve, reject) => {
        sequelize.sync()
            .then(() => {
                console.log('Database & tables created!');
                resolve();
            })
            .catch((err) => {
                reject("Unable to sync the database: " + err);
            });
    });
}

function getAllStudents() {
    return new Promise((resolve, reject) => {
        Student.findAll()
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject("No results returned: " + err);
            });
    });
}

function getStudentsByCourse(course) {
    return new Promise((resolve, reject) => {
        Student.findAll({ where: { course: course } })
            .then(data => {
                if (data.length > 0) {
                    resolve(data);
                } else {
                    reject("no results returned");
                }
            })
            .catch(err => reject("Error: " + err));
    });
}

function getStudentByNum(num) {
    return new Promise((resolve, reject) => {
        Student.findAll({ where: { studentNum: num } })
            .then(data => {
                if (data.length > 0) {
                    resolve(data[0]);
                } else {
                    reject("no results returned");
                }
            })
            .catch(err => reject("Error: " + err));
    });
}

function getCourses() {
    return new Promise((resolve, reject) => {
        Course.findAll()
            .then(data => {
                if (data.length > 0) {
                    resolve(data);
                } else {
                    reject("no results returned");
                }
            })
            .catch(err => reject("Error: " + err));
    });
}

function getCourseById(id) {
    return new Promise((resolve, reject) => {
        Course.findAll({ where: { id: id } })
            .then(data => {
                if (data.length > 0) {
                    resolve(data[0]);
                } else {
                    reject("no results returned");
                }
            })
            .catch(err => reject("Error: " + err));
    });
}

function addStudent(studentData) {
    return new Promise((resolve, reject) => {
        studentData.TA = studentData.TA ? true : false;

        for (let key in studentData) {
            if (studentData[key] === "") {
                studentData[key] = null;
            }
        }

        Student.create(studentData)
            .then(() => resolve())
            .catch(err => reject("unable to create student: " + err));
    });
}

function updateStudent(studentData) {
    return new Promise((resolve, reject) => {
        studentData.TA = studentData.TA ? true : false;

        for (let key in studentData) {
            if (studentData[key] === "") {
                studentData[key] = null;
            }
        }

        Student.update(studentData, { where: { studentNum: studentData.studentNum } })
            .then(() => resolve())
            .catch(err => reject("unable to update student: " + err));
    });
}

/* / / / / / / / / / / / / / / / / / / / / / /
     Adding new collegeData functions
/ / / / / / / / / / / / / / / / / / / / / / */

module.exports.addCourse = function(courseData) {
    return new Promise((resolve, reject) => {
        // Setting blank courseData attributes to null
        for (const field in courseData) {
            if (courseData[field] == "") courseData[field] = null;
        }

        // Create the course
        Course.create(courseData).then(() => {
            resolve();
        }).catch((err) => {
            reject(`unable to create course: ${err}`);
        });
    });
}

module.exports.updateCourse = function(courseData) {
    return new Promise((resolve, reject) => {
        // Setting blank courseData attributes to null
        for (const field in courseData) {
            if (courseData[field] == "") courseData[field] = null;
        }

        // Update the course
        Course.update(courseData, {
            where: { courseId: courseData.courseId }
        }).then(() => {
            resolve();
        }).catch((err) => {
            reject(`unable to update course: ${err}`);
        });
    });
}


module.exports.deleteCourseById = function(id) {
    return new Promise((resolve, reject) => {
        // Delete the course
        Course.destroy({
            where: { courseId: id }
        }).then(() => {
            resolve();
        }).catch((err) => {
            reject(`unable to delete course: ${err}`);
        });
    });
}

exports.deleteStudentByNum = function(studentNum) {
    return new Promise((resolve, reject) => {
        Student.destroy({
            where: {
                studentNum: studentNum
            }
        })
        .then(() => resolve())
        .catch((error) => reject(error));
    });
};



/* / / / / / / / / / / / / / / / / / / / / / /
     The original college data contents
/ / / / / / / / / / / / / / / / / / / / / / */

const fs = require("fs");

class Data{
    constructor(students, courses){
        this.students = students;
        this.courses = courses;
    }
}

let dataCollection = null;

module.exports.initialize = function () {
    return new Promise( (resolve, reject) => {
        fs.readFile('./data/courses.json','utf8', (err, courseData) => {
            if (err) {
                reject("unable to load courses"); return;
            }

            fs.readFile('./data/students.json','utf8', (err, studentData) => {
                if (err) {
                    reject("unable to load students"); return;
                }

                dataCollection = new Data(JSON.parse(studentData), JSON.parse(courseData));
                resolve();
            });
        });
    });
}

module.exports.getAllStudents = function(){
    return new Promise((resolve,reject)=>{
        if (dataCollection.students.length == 0) {
            reject("query returned 0 results"); return;
        }

        resolve(dataCollection.students);
    })
}

module.exports.getCourses = function(){
   return new Promise((resolve,reject)=>{
    if (dataCollection.courses.length == 0) {
        reject("query returned 0 results"); return;
    }

    resolve(dataCollection.courses);
   });
};

module.exports.getStudentByNum = function (num) {
    return new Promise(function (resolve, reject) {
        var foundStudent = null;

        for (let i = 0; i < dataCollection.students.length; i++) {
            if (dataCollection.students[i].studentNum == num) {
                foundStudent = dataCollection.students[i];
            }
        }

        if (!foundStudent) {
            reject("query returned 0 results"); return;
        }

        resolve(foundStudent);
    });
};

module.exports.getStudentsByCourse = function (course) {
    return new Promise(function (resolve, reject) {
        var filteredStudents = [];

        for (let i = 0; i < dataCollection.students.length; i++) {
            if (dataCollection.students[i].course == course) {
                filteredStudents.push(dataCollection.students[i]);
            }
        }

        if (filteredStudents.length == 0) {
            reject("query returned 0 results"); return;
        }

        resolve(filteredStudents);
    });
};

module.exports.getCourseById = function (id) {
    return new Promise(function (resolve, reject) {
        var foundCourse = null;

        for (let i = 0; i < dataCollection.courses.length; i++) {
            if (dataCollection.courses[i].courseId == id) {
                foundCourse = dataCollection.courses[i];
            }
        }

        if (!foundCourse) {
            reject("query returned 0 results"); return;
        }

        resolve(foundCourse);
    });
};

module.exports.addStudent = function (studentData) {
    return new Promise(function (resolve, reject) {

        studentData.TA = (studentData.TA) ? true : false;
        studentData.studentNum = dataCollection.students.length + 1;
        dataCollection.students.push(studentData);

        resolve();
    });

};

module.exports.updateStudent = function (studentData) {
    return new Promise(function (resolve, reject) {

        studentData.TA = (studentData.TA) ? true : false;

        for(let i=0; i < dataCollection.students.length; i++){
            if(dataCollection.students[i].studentNum == studentData.studentNum){
                dataCollection.students[i] = studentData;
            }
        }
        resolve();
    });
};


