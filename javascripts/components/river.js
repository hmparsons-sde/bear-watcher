import util from '../helpers/util.js';
import bearData from '../helpers/data/bearData.js';

const buildBearActivityTable = (activities) => {
    let domString = '';
    if (activities.length > 0) { 
      domString += '<table class="table">';
      domString += '<thead>';
      domString += '<tr>';
      domString += `<th scope="col">Date & Time</th>`;
      domString += `<th scope="col">Result</th>`;
      domString += '</tr>';
      domString += '</thead>';
      domString += '<tbody>';
      for (let i=0; i < activities.length; i++) {
        domString += '<tr>';
        domString += `<td>${moment(activities[i].timestamp).format('MMMM Do YYYY, h:mm:ss a')}</td>`;
        domString += `<td>${activities[i].type}</td>`;
        domString += '</tr>';
      }
      domString += '</tbody>';
      domString += '</table>';
    }
    return domString;
  };

  const trackFailure = (e) => {
    const allBears = bearData.getBears();
    const bearId = e.target.closest('.card').id;
    console.log(bearId);
    const bearPosition = allBears.findIndex((currentBear) => currentBear.id === bearId);
    console.log(allBears[bearPosition]);
    let timestamp = '';
    let type = '';
    let newActivity = {
        timestamp: Date.now(),
        type: "Failure"
      };
    // console.log(newActivity);
    const activities = [];
    allBears[bearPosition].activities.push(newActivity);
    console.log(allBears[bearPosition].activities);
    buildBearActivityTable(allBears[bearPosition].activities);
    console.log('Tried but failed miserably...');
    buildBearSleuth();
  };
    
  const trackSuccess = (e) => {
    const allBears = bearData.getBears();
    const successBearId = e.target.closest('.card').id;
    console.log(successBearId);
    const successBearPosition = allBears.findIndex((currentBear) => currentBear.id === successBearId);
    // console.log(trackedBears[successBearPosition]);
    let timestamp = '';
    let type = '';
    let newActivity = {
        timestamp: Date.now(),
        type: "Success"
      };
    console.log(newActivity);
    // const activities = [];
    allBears[successBearPosition].activities.push(newActivity);
    console.log(allBears[successBearPosition].activities);
    buildBearActivityTable(allBears[successBearPosition].activities);
    console.log('It got a fish!! Yeah!!');
    buildBearSleuth();
  };
    
  const bearFailureEvent = () => {
      const triedButtons = document.getElementsByClassName('bear-tried-button');
      for(let i = 0; i < triedButtons.length; i++){
        triedButtons[i].addEventListener('click', trackFailure);
      }
    };
    
  const bearSuccessEvent = () => {
    const gotItButtons = document.getElementsByClassName('bear-caught-fish-button');
    for(let i = 0; i < gotItButtons.length; i++){
      gotItButtons[i].addEventListener('click', trackSuccess);
    }
  };  

const buildBearSleuth = () => {
    const allBears = bearData.getBears();
    let domString = `<h2>Our Sleuth of Bears</h2>`;
    domString += '<div class="d-flex flex-wrap">';
    for (let i = 0; i < allBears.length; i++) {
        domString += `<div class="card bg-light mb-3 mx-3 col-4" id=${allBears[i].id}>`;
            domString += `<img src="${allBears[i].imageUrl}" class="card-img-top img-fluid img-thumbnail alt="bear-photo">`;
            domString += '<div class="card-body">';
                domString += `<h5 class="card-title">${allBears[i].name}</h5>`;
                domString += `<button type="button" class="btn btn-outline-warning bear-tried-button">Tried to...</button>`;
                domString += `<button type="button" class="btn btn-outline-success bear-caught-fish-button">Got it!!!</button>`;
                domString += '<table class="table">';
                domString += buildBearActivityTable(allBears[i].activities);
                domString += '</table>';
              domString += '</div>';
        domString += '</div>';
    }
    domString += '</div>';
    util.printToDom('bear-container', domString);
    bearFailureEvent();
    bearSuccessEvent();
};

export default { buildBearSleuth };