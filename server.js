/*********************************************************************************
 * 
 *  WEB322 – Assignment 06
 *  I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students. 
 * 
 *  Name: Chris Simon 
 *  Student ID: 123382228 
 *  Date: August 5th 2023
 * 
 *********************************************************************************/


/* / / / / / / / / / / / / / / / / / /

    All of this commented code at
    the beginning is me following
    along with the week 7 notes
    from the seneca WEB website

    --

    I'm just keeping it here for 
    reference because I had the
    postgres database working

/ / / / / / / / / / / / / / / / / / */

// const Sequelize = require('sequelize');

// //set up sequelize point to our postgres database
// var sequelize = new Sequelize('ugjdfzsw', 'ugjdfzsw', '3cUEo6Xsl3eKR2AAYyMKwAv7yZcGm2Yd', {
//     host: 'rajje.db.elephantsql.com',
//     dialect: 'postgres',
//     port: 5432,
//     dialectOptions: {
//         ssl: { rejectUnauthorized: false }
//     },
//     query: { raw: true }
// });


// sequelize
//     .authenticate()
//     .then(function() {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(function(err){
//         console.log('Unable to connect to the database: ', err);
// });


////////// Creating our student database

// var Student = sequelize.define('Student', {
//     studentNum: Sequelize.INTEGER,
//     firstName: Sequelize.STRING,
//     lastName: Sequelize.STRING,
//     email: Sequelize.STRING,
//     addressStreet: Sequelize.STRING,
//     addressCity: Sequelize.STRING,
//     addressProvince: Sequelize.STRING,
//     TA: Sequelize.BOOLEAN,
//     status: Sequelize.STRING
// });

// var Course = sequelze.define('Course', {
//     couseId: Sequelize.INTEGER,
//     courseCode: Sequelize.STRING
// });

// Course.hasMany(Student);


// Define a "project" model

// var Project = sequelize.define('Project', {
//     title: Sequelize.STRING,
//     edscription: Sequelize.TEXT
// });

// sequelize.sync().then(function () {

//     //create a new "prject" and add it to the database
//     Project.create({
//         title: 'Project1',
//         description: 'First Project'
//     }).then(function (project) {
//         //we an access the new project via the project variable
//         console.log("Success!");
//     }).catch(function(error){
//         console.log("Something went wrong!");
//     });
// });

//defining a table that stores blog entries



// sequelize.sync().then(function () {
    
//     // Create user "Jason Bourne"
//     User.create({
//         fullName: "Jason Bourne",
//         title: "developer"
//     }).then(function (user) {

//         console.log("user created");
        
//             // Create "Task 1" for the new user
//         Task.create({
//             title: "Task 1",
//             description: "Task 1 description",
//             UserId: user.id // set the correct Userid foreign key
//         }).then(function(){ console.log("Task 1 created")});

//         // Create "Task 2" for the new user
//         Task.create({
//             title: "Task 2",
//             description: "Task 2 description",
//             UserId: user.id // set the correct Userid foreign key
//         }).then(function(){ console.log("Task 2 created")});
//     });

// });


//there's also belongsTo(), hasOne(), and belongsToMany()

/* / / / / / / / / / / / / / / / / /
              C R U D
/ / / / / / / / / / / / / / / / / */

//CRUD stands for Create, Read, Update and Delete

// var Name = sequelize.define('Name', {
//     fName: Sequelize.STRING,
//     lName: Sequelize.STRING,
// });

//CREATE

// sequelize.sync().then(function () {

//     Name.create({
//         fName: "Kyler",
//         lName: "Odin"
//     }).then(function(){ console.log("Kyler Odin created")});

//     Name.create({
//         fName: "Grier",
//         lName: "Garrick"
//     }).then(function(){ console.log("Grier Garrick created")});

//     Name.create({
//         fName: "Kolby",
//         lName: "Greyson"
//     }).then(function(){ console.log("Kolby Greyson created")});

// });

//READ

// sequelize.sync().then(function () {

//     // return all first names only
//     Name.findAll({ 
//         attributes: ['fName']
//     }).then(function(data){        
//         console.log("All first names");
//         for(var i =0; i < data.length; i++){
//             console.log(data[i].fName);
//         }
//     });

//     // return all first names where id == 2
//     Name.findAll({ 
//         attributes: ['fName'],
//         where: {
//             id: 2
//         }
//     }).then(function(data){
//         console.log("All first names where id == 2");
//         for(var i =0; i < data.length; i++){
//             console.log(data[i].fName);
//         }
//     });

// });

//UPDATE

// sequelize.sync().then(function () {
//     // update User 2's last name to "James"
//     // NOTE: this also updates the "updatedAt field"
//     Name.update({
//         lName: "James"
//     }, {
//         where: { id: 2 } // only update user with id == 2
//     }).then(function () { console.log("successfully updated user 2");});

// });

// //DELETE

// sequelize.sync().then(function () {

//     // remove User 3 from the database
//     Name.destroy({
//         where: { id: 3 } // only remove user with id == 3
//     }).then(function () { console.log("successfully removed user 3");});

// });



const HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
const exphbs = require('express-handlebars');

var app = express();

var path = require("path");
//var data = require("./modules/officeData.js");
var data = require("./modules/collegeData.js");

const Handlebars = require("handlebars");

//setting the handlebars engine
app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

//serving static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

//serving bootstrap
app.use('/css', express.static(path.join(__dirname,'/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname,'/node_modules/bootstrap/dist/js')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));




//------------------------
// Server Setup
//------------------------

app.listen(HTTP_PORT, ()=>{console.log("server listening on port: " + HTTP_PORT)});

//welcome message
function onHTTPSTART(){
    console.log("Express http server listening on: " + HTTP_PORT);
}


//------------------------
// Get Students
//------------------------

app.get("/students", (req, res) => {
    data.initialize().then(()=> {
        return data.getStudents();  // Assuming this function exists in your data module
    }).then((students) => {
        if (students.length > 0) {
            res.render("students", {students: students});
        } else {
            res.render("students", {message: "no results"});
        }
    }).catch((err) => {
        res.render("students", {message: "no results"});
    });
});

//------------------------
// Get Courses
//------------------------

app.get("/courses", (req, res) => {
    data.initialize().then(()=> {
        return data.getCourses();
    }).then((courses) => {
        if (courses.length > 0) {
            res.render("courses", {courses: courses});
        } else {
            res.render("courses", {message: "no results"});
        }
    }).catch((err) => {
        res.render("courses", {message: "no results"});
    });
});

//-------------------------------------------
// Adding, Updating and Deleting Courses
//-------------------------------------------

//add course - getting the route
app.get('/courses/add', (req,res) => {
    res.render('addCourse');
});

//add course - POST route
app.post('/courses/add', (req, res) => {
    data.addCourse(req.body).then(() => {
        res.redirect('/courses');
    }).catch((err) => {
        res.status(500).send(`Error: ${err}`);
    });
});

//update course
app.post('/course/update', (req, res) => {
    data.updateCourse(req.body).then(() => {
        res.redirect('/courses');
    }).catch((err) => {
        res.status(500).send(`Error: ${err}`);
    });
});

//delete course
app.get('/course/delete/:id', (req, res) => {
    data.deleteCourseById(req.params.id).then(() => {
        res.redirect('/courses');
    }).catch((err) => {
        res.status(500).send(`Unable to Remove Course / Course not found: ${err}`);
    });
});

//get course by id 
app.get('/course/:id', (req, res) => {
    data.getCourseById(req.params.id).then((data) => {
        if (data) {
            res.render('course', { data: data });
        } else {
            res.status(404).send('Course Not Found');
        }
    }).catch((err) => {
        res.status(500).send(`Error: ${err}`);
    });
});

//add students
app.get('/students/add', function(req, res) {
    data.getCourses()
    .then(data => res.render('addStudent', { courses: data }))
    .catch(() => res.render('addStudent', { courses: [] }));
});


//delete students
app.get('/student/delete/:studentNum', (req, res) => {
    data.deleteStudentByNum(req.params.studentNum)
        .then(() => res.redirect('/students'))
        .catch(() => res.status(500).send('Unable to Remove Student / Student not found'));
});


/* / / / / / / / / / / / / / / / / / / / / / / / / /
    Legacy code for previous handlebars requests
/ / / / / / / / / / / / / / / / / / / / / / / / / */

//----------------------------------------------
// Display employee info using handlebars
//----------------------------------------------

// app.get("/employees", (req, res) => {
//     data.initialize().then(()=> {
//         return data.getAllEmployees();
//     }).then((employees) => {
//         res.render("employees", {employees: employees});
//     }).catch((err) => {
//         res.render("employees", {message: "no results"});
//     });
// });

// //------------------------
// // Add Employees
// //------------------------

// app.get("/employees/add", (req, res) => { 
//     res.sendFile(path.join(__dirname,"/views/addEmployee.html"));
// });

// //when posted, redirect to employees page on success. Show error if failure.
// app.post("/employees/add", (req, res) => { 
//     data.addEmployee(req.body).then(() => {
//       res.redirect("/employees");
//     }).catch((err) => {
//       console.log(err);
//       if (err === 'An employee with this last name already exists.') {
//         res.status(400).send(err);
//       } else {
//         res.status(500).send("Failed to add the employee");
//       }
//     });
//   });

// //------------------------
// // Description Page
// //------------------------

// app.get("/description", (req, res) => {
//     res.render("description");
// });

// //------------------------
// // Get Part Timers
// //------------------------

// app.get("/PartTimer", (req, res) => { 
    
//     data.initialize().then(()=> {
//         //first we initialize and get the data from our JSON arrays
//         return data.getPartTimers();
//     }).then((partTimers) => {
//         //then we determine our part timers
//         res.json(partTimers);
//     }).catch((err) => {
//         //if an error occurs, show the client this message:
//         res.send("Could not generate list of Part Timers."); 
//     });

// });

// //------------------------
// // Get Employee By Number
// //------------------------

// app.get("/employee/:num", (req, res) => { 
    
//     var num = req.params.num;

//     //force the parameter to be an integer, then validate it
//     var employeeNumber = parseInt(num);

//     console.log(employeeNumber);
    
//     if (isNaN(employeeNumber)){
//         res.status(400).json({error: "Error! Employee number needs to be an integer."});
//     } else {
//         data.initialize().then(()=> {
//             //if initialization successful, get part time employees
//             return data.getEmployeeByNum(employeeNumber);
//         }).then((retrievedEmployee) => {
//             res.json(retrievedEmployee);
//         }).catch((err) => {
//             res.send("Could not locate employee " + employeeNumber);
//             res.status(500).json({error: err});
//         });
//     }
// });



// /* / / / / / / / / / / / / / / / / / / / / / / /
//                 U R L   P A T H S
// / / / / / / / / / / / / / / / / / / / / / / / */


// //------------------------
// // Default Url Path
// //------------------------

app.get("/", (req, res) => { 
    res.sendFile(path.join(__dirname,"/views/home.html"));
});

// //------------------------
// // Table page
// //------------------------

// app.get("/table",(req,res)=>{
//     res.sendFile(path.join(__dirname,"/views/table.html"));
// });

// //------------------------
// // List page
// //------------------------

// app.get("/list",(req,res)=>{
//     res.sendFile(path.join(__dirname,"/views/list.html"));
// });

// //------------------------
// // Storefront page
// //------------------------

// app.get("/storefront", (req, res) => { 
//     res.sendFile(path.join(__dirname,"/views/storefront.html"));
// });

// //------------------------
// // No matching route
// //------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).send("<h1>404 - Page not found!</h1><br><p>Click <a href='./'>here</a> to return to the main page.</p>");
  });