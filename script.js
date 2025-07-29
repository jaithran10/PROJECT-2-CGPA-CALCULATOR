let cgpa=0.0;
let sgpa=[];
let credits=[];
let semesterCount = 0;
function deleteRow() {
  const table= document.querySelector("table");
  if(table.rows.length===2)
  {
    alert("No rows will be left");
  }
  else
  {
    table.deleteRow(table.rows.length-1);
    table.deleteRow(table.rows.length-1);
    const row = document.createElement("tr");
    row.innerHTML = `<td>SGPA</td><td colspan="2">0.0</td>`;
    table.append(row);
  }
  return row;
}
function createSubjectRow()
{
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><textarea>Subject</textarea></td>
    <td><textarea>4</textarea></td>
    <td><button onclick="openModal(this)">SELECT</button></td>
     `;
  const table = document.querySelector("table");
  table.deleteRow(table.rows.length-1);
  table.append(row);
  const sg=document.createElement("tr");
  sg.innerHTML=`<td>SGPA</td>
    <td colspan="2">0.0</td>`;
  table.append(sg);
  return row;
}
let gradebutton=null;
function openModal(button)
     {
      gradebutton=button;
      const radios=document.getElementsByName("grade");
      for(let r of radios)
        r.checked=false;
      document.getElementById("gradeModal").style.display="flex";
     } 
function submitbutton() {
      const grades=document.getElementsByName("grade");
      let selectedgrade=null;
      for(let g of grades)
      {
        if (g.checked) {
          selectedgrade=g.value;
          break;
        }
      }
        if(selectedgrade && gradebutton)
          gradebutton.innerText=selectedgrade;
        const row=gradebutton.closest("tr");
        const creditarea=row.querySelectorAll("textarea")[1];
        const credit = parseFloat(creditarea.value);
             const table = gradebutton.closest("table");
             const lastRow = table.rows[table.rows.length - 1];
             const sgpaCell = lastRow.cells[1]; // colspan="2" is the second cell
             const semIndex = Array.from(document.querySelectorAll("table")).indexOf(table);
             const sg = calsgpa(table);
             sgpa[semIndex] = parseFloat(sg);
            sgpaCell.textContent = sg;
            document.getElementById("cgpaDisplay").textContent = "CGPA: " + calcCgpa();
      document.getElementById("gradeModal").style.display="none";
    gradebutton=null;
    }
function createsemester()
{
  if(semesterCount>=9)
  {
    alert("Max Semester Reached overflow");
  }
  const htmlbody=document.body;
semesterCount++;
const heading=document.createElement("h3");
heading.textContent=`SEMESTER ${semesterCount+1}`;
const table=document.createElement("table");
table.border="2px";
const head=document.createElement("tr");
head.innerHTML=`<td>COURSES</td>
    <td>CREDITS</td>
    <td>GRADE</td>`;
 table.append(head);
          const ending=document.createElement("tr");
          ending.innerHTML = `<td>SGPA</td><td colspan="2">0.0</td>`;
          for(let i=1; i<=7 ;i++)
          table.append(createSubjectRow());
const buttonadd=document.createElement("button");
buttonadd.textContent="ADD SUBJECT";
buttonadd.className="ADD";
buttonadd.onclick= () =>{
                        const newsubadd= createSubjectRow();
                        table.deleteRow(table.rows.length-1);
                        table.append(newsubadd);
                        const sg=document.createElement("tr");
                        sg.innerHTML=`<td>SGPA</td>
                       <td colspan="2">0.0</td>`;
                        table.append(sg);
                         };
const buttondel=document.createElement("button");
buttondel.textContent="DEL SUBJECT";
buttondel.className="ADD";
buttondel.onclick= () =>{
                        if(table.rows.length===2)
                          {
                            alert("No rows will be left");
                          }
                        else
                          {
                            table.deleteRow(table.rows.length-1);
                            table.deleteRow(table.rows.length-1);
                            const row = document.createElement("tr");
                            row.innerHTML = `<td>SGPA</td><td colspan="2">0.0</td>`;
                            table.append(row);
                          }
                        }
table.append(ending);
htmlbody.append(heading);
htmlbody.append(table);
htmlbody.append(buttonadd);
htmlbody.append(buttondel);

}
function getGradePoint(grade) {
  let point = 0;
  if (grade === "S") point = 10;
  else if (grade === "A+") point = 9;
  else if (grade === "A") point = 8.5;
  else if (grade === "B+") point = 8;
  else if (grade === "B") point = 7.5;
  else if (grade === "C+") point = 7;
  else if (grade === "C") point = 6.5;
  else if (grade === "D+") point = 6;
  else if (grade === "D") point = 5.5;
  else if (grade === "P") point = 5;
  else if (grade === "F") point = 0;
  else point = -1;
  return point;
}

function calsgpa(table) {
  let totalcredits = 0;
  let totalpoints = 0;
  const rows = table.querySelectorAll("tr");

  for (let row of rows) {
    const textareas = row.querySelectorAll("textarea");
    const button = row.querySelector("button");

    if (textareas.length === 2 && button) {
      const credit = parseFloat(textareas[1].value);
      const grade = button.innerText.trim();
      const gradePoint = getGradePoint(grade);

      if (!isNaN(credit) && gradePoint >= 0) {
        totalcredits += credit;
        totalpoints += credit * gradePoint;
      }
    }
  }

  if (totalcredits === 0) return "0.00";
  return (totalpoints / totalcredits).toFixed(2);
}
function calcCgpa() {
  let total = 0;
  for (let index = 0; index <=semesterCount; index++) {
    total += sgpa[index];
  }
  const result = total / (semesterCount+1);
  return result.toFixed(2);
}

