let parameters = {
    columns : [
      {
        title: 'Datetime',
        html:  function (row) { return row.datetime; }
      },
      {
        title: 'City',
        html: function (row) { return row.city }
      },
      {
        title: 'State',
        html: function (row) { return row.state }
      },
      {
        title: 'Country',
        html: function (row) { return row.country }
      },
      {
        title: 'Shape',
        html: function (row) { return row.shape }
      },
      {
        title: 'Duration',
        html: function (row) { return row.durationMinutes }
      },
      {
        title: 'Comments',
        html: function (row) { return row.comments }
      }],
    data: null,
    filtered_data: null
  };


  
let myD3 = d3.select('#my-d3');
let searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', handleSubmitClick);
function handleSubmitClick(event) {
    let mFixed = 1
    let dFixed = 1
    let fixedDate = ''
    // fix month format
    let mCheck = dateInput.value.substring(0,1)
    if (mCheck == 0) {
        mFixed = dateInput.value.substring(1,3);
    } else {
        mFixed = dateInput.value.substring(0,3);
    }
    // fix day format
    let dCheck = dateInput.value.substring(3,4)
    if (dCheck == 0) {
        dFixed = dateInput.value.substring(4,6);
    } else {
        dFixed = dateInput.value.substring(3,6);
    }
    // set fixedDate to corrected date format
    fixedDate = mFixed + dFixed  + dateInput.value.substring(6)
    console.log(fixedDate)
    parameters.filtered_data = [];
    for (let row of parameters.data) {
        if (row.datetime === fixedDate) {
          parameters.filtered_data.push(row);
        } else if (fixedDate == '') {
            parameters.filtered_data.push(row);
        }
    }
    createTables();
}


function init(dataSet) {
    parameters.data = dataSet;
    parameters.filtered_data = dataSet;
    createTables();
}

init(dataSet);

function createTables() {
    myD3.html('');
    let table = d3.select('#my-d3').append('table').attr('class', 'table');

    table.append('thead').append('tr')
      .selectAll('th')
      .data(parameters['columns'])
      .enter()
      .append('th')
      .text(function (data) { return data.title; });
  
    table.append('tbody')
      .selectAll('tr') // create row for each row of data
      .data(parameters.filtered_data)
      .enter()
      .append('tr')
      .selectAll('td')
      .data(function (row) {
        // evaluate column objects against the current row
        return parameters.columns.map(function (column) {
          var cell = {};
          d3.keys(column).forEach(function (k) {
            if (typeof (column[k]) === 'function') {
              cell[k] = column[k](row)
            }
          });
          return cell;
        });
      }).enter()
      .append('td')
      .text(function (data) { return data.html; });
  
  }