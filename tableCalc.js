function tableCalc() {
  //Making table
  table = []; // clearing
  let r;
  let maxBel;
  let maxSD = 3;
  let density;
  let minDia = 1;
  let maxDia = 6;
  let diaInc = 0.1;
  let noDia = round((maxDia - minDia) / diaInc + 1);
  let noMaterials = alloyData.names.length;

  let d;
  let l;
  let m;
  let load;
  let klaring;
  let SD;
  let price;
  let y = 0;

  //Datafelt
  for (let a = 0; a < noMaterials; a++) {
    r = getRes(elementTemp, a);
    maxBel = getMaxLoad(elementTemp, a);
    density = alloyData.density[a];

    for (let D = 0; D < noDia; D++) {

      d = minDia + D * diaInc;
      l = resUI.value * PI * d * d / 4 / r;
      load = powerUI.value / PI / d / l / 10 / maxBel * 100;
      
      // Sjekk om alternativet er helt dust
      if (load < 150){
        klaring = PI * (diaUI.value - d) * lengthUI.value / l / 1000 - d;
        SD = klaring / d + 1;
        if (SD > 1.5){
          // Alternativet er verdt å vise
          
          m = PI / 4 * d * d * l * density / 1000000;
          price = m * alloyData.price[a];
          
          // regn ut kostnad ink. levetid
          let tCost = getCost(load,SD,price,maxSD);
          
          table[y] = [];
          table[y][0] = y + 1;
          table[y][1] = alloyData.names[a];
          table[y][2] = d;
          table[y][3] = round(l, 2);
          table[y][4] = round(m, 2);
          table[y][5] = round(load);
          table[y][6] = round(klaring, 1);
          table[y][7] = round(price,2);
          table[y][8] = tCost;
          
          y = y + 1;
          
        } else {
          // ingen større diametre vil gå
          break;
        }
      }
    }
  }
  // Tabell komplett
  // Sorter tabell
  table.sort(sortFunction);
  for (let a = 0; a < table.length; a++){
    table[a][0] = a + 1;
  }
  
}

function sortFunction(aP, bP) {
  let sortColumn = 8;
    if (aP[sortColumn] === bP[sortColumn]) {
        return 0;
    }
    else {
        return (aP[sortColumn] < bP[sortColumn]) ? -1 : 1;
    }
}


function getRes(passedTemp, passedAlloy) {
  // Retrieving correct res from table
  let i = 0
  for (i = 0; i < alloyData.resistivity.length; i++) {
    let dataTemp = alloyData.resistivity[i][0];
    if (dataTemp > passedTemp) {
      break;
    }
  }
  
  let higherTemp = alloyData.resistivity[i][0];
  let lowerTemp = alloyData.resistivity[i - 1][0];
  let higherRes = alloyData.resistivity[i][passedAlloy + 1];
  let lowerRes = alloyData.resistivity[i - 1][passedAlloy + 1];

  let r = lowerRes + (passedTemp - lowerTemp) * (higherRes - lowerRes) / (higherTemp - lowerTemp);

  return r;
}


function getMaxLoad(passedTemp, passedAlloy) {
  // Retrieving correct res from table
  let i = 0
  for (i = 0; i < alloyData.maxLoad.length; i++) {
    let dataTemp = alloyData.maxLoad[i][0];
    if (dataTemp > passedTemp) {
      break;
    }
  }
  let higherTemp = alloyData.maxLoad[i][0];
  let lowerTemp = alloyData.maxLoad[i - 1][0];
  let higherLoad = alloyData.maxLoad[i][passedAlloy + 1];
  let lowerLoad = alloyData.maxLoad[i - 1][passedAlloy + 1];

  let mLoad = lowerLoad + (passedTemp - lowerTemp) * (higherLoad - lowerLoad) / (higherTemp - lowerTemp);
  //console.log(mLoad);
  return mLoad;
}

function getCost(loadP,SDP,priceP,maxSDP){
  // Regner ut total kostnad ink. reparasjoner
  let dumbLoad = 120;
  let dumbSD = 1;
  
  let prodCost = priceP + 200; 
  let repCost = 15000 / 20; // kost per coil!
  
  if (loadP > dumbLoad){
    return Infinity;
  } else if(SDP < dumbSD){
    return Infinity;
  }
  
  let loadReps = 1/(dumbLoad-loadP);
  let sdReps = (maxSDP-1)/(SDP-1);
  
  let noReps = 200 * pow(loadReps,2);
  
  noReps = noReps + 1/10*pow(sdReps,3);
  
  let tCost = prodCost + (repCost + priceP)*noReps;
  
  return tCost;
  
}




