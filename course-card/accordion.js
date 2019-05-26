let acc = document.getElementsByClassName("filling__title");
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {

        this.classList.toggle("is-active");
        let panel = this.nextElementSibling;
        let plus_minus = this.children[0].children[0].children[0];

        plus_minus.classList.toggle("fa-minus");

        if (panel.style.display === "block") {
            panel.style.display = "none";
            plus_minus.classList.toggle("fa-plus");
        } else {
            panel.style.display = "block";

        }
    });
}

//Level stars
for (let i = 0; i < db['level']; i++) {
    if (db['level'] >= 4) break;
    let stars = document.getElementById("level__block-stars")
        .innerHTML += '<img src="img/Yellow_Star.png"/>';
}

if (db["level"] === 1) {
    let level_text = document.getElementById("level__block-txt")
        .innerHTML += 'Контентний';
}

if (db["level"] === 2) {
    let level_text = document.getElementById("level__block-txt")
        .innerHTML += 'Інтерактивний';
}

if (db["level"] === 3) {
    let level_text = document.getElementById("level__block-txt")
        .innerHTML += 'Автономний';
} 

if (db["level"] === 0) {
    let level_text = document.getElementById("level__block-txt")
        .innerHTML += 'Відсутній';
}

//set a progress bar value

document.title = db['full-name-pns'];
document.getElementById('amount_of_content_elements_percent').value = db['amount-of-content-elements-percent'];
document.getElementById('napovnenia_percent').value = db['napovnenia-percent'];
document.getElementById('file_percent').value = db['file-percent'];
document.getElementById('teka_percent').value = db['teka-percent'];
document.getElementById('posilania_percent').value = db['posilania-percent'];
document.getElementById('storinka_percent').value = db['storinka-percent'];
document.getElementById('book_element_percent').value = db['book-element-percent'];
document.getElementById('bank_tests_question_percent').value = db['bank-tests-question-percent'];
document.getElementById('amount_term_glosary_percent').value = db['amount-term-glosary-percent'];
document.getElementById('amount_wiki_pages_percent').value = db['amount-wiki-pages-percent'];
document.getElementById('activity_percent').value = db['activity-percent'];
document.getElementById('amount_of_active_students_percent').value = db['amount-of-active-students-percent'];
document.getElementById('mid_activity_of_students_percent').value = db['mid-activity-of-students-percent'];
document.getElementById('amount_visible_inter_elements_percent').value = db['amount-visible-inter-elements-percent'];
document.getElementById('tests_percent').value = db['tests-percent'];
document.getElementById('tasks_percent').value = db['tasks-percent'];
document.getElementById('H5P_percent').value = db['H5P-percent'];
document.getElementById('average_test_attempt_percent').value = db['average-test-attempt-percent'];
document.getElementById('average_work_mark_percent').value = db['average-work-mark-percent'];
document.getElementById('average_H5P_percent').value = db['average-H5P-percent'];
document.getElementById('average_term_glosary_percent').value = db['average-term-glosary-percent'];
document.getElementById('average_amount_wiki_students_percent').value = db['average-amount-wiki-students'];
document.getElementById('communication_percent').value = db['communication-percent'];
document.getElementById('amount_communication_elem_percent').value = db['amount-communication-elem-percent'];
document.getElementById('amount_notification_forum_percent').value = db['amount-notification-forum-percent'];
document.getElementById('amount_notification_forum_student_percent').value = db['amount-notification-forum-student-percent'];
document.getElementById('amount_notification_forum_percent').value = db['amount-notification-forum-percent'];
document.getElementById('amount_comments_percent').value = db['amount-comments-percent'];