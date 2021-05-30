// Course class
class Course {
  constructor(title, instructor, image, Promotion, price) {
    this.courseId = Math.floor(Math.random() * 10000);
    this.title = title;
    this.instructor = instructor;
    this.image = image;
    this.Promotion = Promotion;
    this.price = price;
  }
}
// UI class
class UI {
  addCourseToList(course) {
    const list = document.getElementById("course-list");

    var html = `
         <tr>
            <td><img class="image" src="img/${course.image}"/></td>
            <td>  <video class="Promotion" controls src="promotion/${course.Promotion}"> </video>
            <td class="table-text"> <p>${course.title}</p></td>
            <td> <p>${course.instructor}</p></td>
            <td><a href ="https://www.udemy.com/courses/search/?src=ukw&q=javascript" target="_blank" class="gocourse" > <p>Go to course</p> </a> </td>
            <td> <p>${course.price}</p></td>
            <td><a href="#" data-id="${course.courseId}" class="bi bi-trash delete"> </a></td>
            
         </tr>    
    `;

    list.innerHTML += html;
  }

  clearControls() {
    const Promotion = (document.getElementById("Promotion").value = "");
    const title = (document.getElementById("title").value = "");
    const instructor = (document.getElementById("instructor").value = "");
    const image = (document.getElementById("image").value = "");
    const price = (document.getElementById("price").value = "");
  }

  deleteCourse(element) {
    if (element.classList.contains("delete")) {
      if (confirm("Do you approve the deletion of this course?")) {
      } else {
        return false;
      }

      element.parentElement.parentElement.remove();
      const id = element.getAttribute("data-id");
      const courses = Storage.getCourses();
      courses.forEach((course, index) => {
        if (course.courseId == id) {
          courses.splice(index, 1);
        }
      });
      localStorage.setItem("courses", JSON.stringify(courses));
      return true;
    }
  }

  showAlert(message, className) {
    var alert = `
         <div class="alert alert-${className}">
            ${message}
         </div>    
        `;

    const row = document.querySelector(".row");
    // beforeBegin , afterBegin , beforeEnd , afterEnd
    row.insertAdjacentHTML("beforeBegin", alert);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
}

class Storage {
  static getCourses() {
    let courses;

    if (localStorage.getItem("courses") === null) {
      courses = [];
    } else {
      courses = JSON.parse(localStorage.getItem("courses"));
    }
    return courses;
  }

  static displayCourses() {
    const courses = Storage.getCourses();

    courses.forEach((course) => {
      const ui = new UI();
      ui.addCourseToList(course);
    });
  }

  static addCourse(course) {
    const courses = Storage.getCourses();
    courses.push(course);
    localStorage.setItem("courses", JSON.stringify(courses));
  }
}

document.addEventListener("DOMContentLoaded", Storage.displayCourses);

document.getElementById("new-course").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value;
  const instructor = document.getElementById("instructor").value;
  const image = document.getElementById("image").value;
  const Promotion = document.getElementById("Promotion").value;
  const price = document.getElementById("price").value;

  // create course object
  const course = new Course(title, instructor, image, Promotion, price);

  // create UI
  const ui = new UI();

  if (title === "" || instructor === "" || image === "") {
    ui.showAlert("Please complete the form", "warning");
  } else {
    // add course to list
    ui.addCourseToList(course);

    // save to LS
    Storage.addCourse(course);

    // clear controls
    ui.clearControls();

    ui.showAlert("The course has been added", "success");
  }

  e.preventDefault();
});

document.getElementById("course-list").addEventListener("click", function (e) {
  const ui = new UI();

  // delete course
  if (ui.deleteCourse(e.target) == true) {
    ui.showAlert("The course has been deleted", "danger");
  }
});
