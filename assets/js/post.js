var optimizePostAsp = false;
var optimizePostExtended = false;

//ASP
function post_asp(){
	error = document.getElementById('error');
	error.innerHTML = "";
	var inflow, in_bod, ef_bod, mlvss, mlss, ss, a_mlvss, mcrt, efficiency;

	inflow = $("#inflow").val();
	in_bod = $("#in_bod").val();
	ef_bod = $("#ef_bod").val();

	if(inflow <= 0){error.innerHTML += "Please enter inflow quantity.<br/>";}
	if(in_bod <= 0){error.innerHTML += "Please enter influent BOD.<br/>";}
	if(ef_bod <= 0){error.innerHTML += "Please enter effluent BOD.<br/>";}

	if(error.innerHTML != ""){
		$('#mymodal').modal('show');
		return false;
	}
	// Assumptions
	n_var = 0.8; // n_var = mlvss/mlss
	ss = 10000;

	efficiency = ((in_bod - ef_bod) / in_bod) * 100;

	kd = 0.06;
	y = 0.5;
	if (!optimizePostAsp) {
		mcrt = 10; // 5 to 15 days
		x = 3500; // MLVSS in aeration tank
		vol = ((inflow*mcrt*y*(in_bod - ef_bod)) / (x*(1 + kd*mcrt)));
	}else if (optimizePostAsp) {
		$('#loading').modal('show');
		var DataArray = [];
		// alert('Double For loop STarts');
		for (var i = 5; i < 16; i++) { // `i` is alias of MCRT (days)
			var graphDataArray = [];
			for (count = 3000; count < 6001; count++ )//`count` is alias of X (MLVSS)
			 {
				graphDataArray.push(
					{"x": count ,"y": ((inflow*i*y*(in_bod - ef_bod)) / (count*(1 + kd*i)))}
					); //Create an object of (x,y) points whose set is used in CanvasJS
				count = count + 99;
			}
			DataArray.push(graphDataArray); //Data Array is a collection of set of such points
		}
		$('#loading').modal('hide');

		$('#optimize').modal('show');

		renderGraph(DataArray, 'asp');
		var res = [];
		var obj = [];
		for (var i = 0; i < DataArray.length; i++) { //Each set has a minimum
			res[i] = Math.min.apply(Math,DataArray[i].map(function(o){return o.y;})); //Obtain the minimum value of volume in each set
			obj[i] = DataArray[i].find(function(o){ return o.y == res[i]; }); //Obtain the object with minimum volume in each set
		}
		var finalRes = Math.min.apply(Math,obj.map(function(o){return o.y;})); //Minimum volume from the set of minimum values 
		var finalObj = obj.find(function(o){ return o.y == finalRes; }); //Respective Object is obtained
		x = finalObj['x'];
		vol = finalObj['y'];
		for (var i = 0; i < obj.length; i++) {
			if (obj[i]['x'] == x && obj[i]['y'] == vol ) {
				var flag = i; //Respective MCRT is obtained
			}
		}
		mcrt = flag + 5;
	}

	

	hrt = (vol*24) / inflow;
	do{
		if(hrt > 5){
			vol = vol * 0.95;
			hrt = (vol*24) / inflow;
		}
		if(hrt < 3){
			vol = vol * 1.05;
			hrt = (vol*24) / inflow;
		}
	}while(hrt < 3 || hrt > 5)

	fm = (inflow*in_bod) / (vol*x);
	if(fm > 0.05 && fm < 0.15){
		error.innerHTML += "F/M ratio is between 0.05 and .15, Extended Aeration Process is recommended.<br/>";
	}else if(fm > 0.2 && fm < 0.6){
		// ASP
	}
	if(error.innerHTML != ""){
		$('#mymodal').modal('show');
		return false;
	}

	vol_loading = (inflow * in_bod) / (vol*1000);

	//sludge waste
	yobs = y/(1 + kd*mcrt);
	px = (yobs*inflow*(in_bod - ef_bod))/1000;
	sludge_waste = px/n_var;

	//Sludge waste volume based on mean cell residence time
	q_w = (vol*x)/(mcrt*ss*n_var);

	//Recirculation ratio
	rec_ratio = x/(ss*n_var - x);

	//Estimation of air requirement 
	req_oxygen = (inflow*(in_bod - ef_bod))/(0.68*1000) - (1.42*q_w*ss*n_var)/1000;

	//Volume of air required
	vol_air = req_oxygen/(1.201 * 0.23*.08);
	air_req = (vol_air/(24*60))*2;

	//Check for air volume
	air_req_p_vol = vol_air/inflow;


	//Ouput
	document.getElementById('efficiency').value = efficiency.toFixed(2);
	document.getElementById('vol').value = vol.toFixed(2);
	document.getElementById('hrt').value = hrt.toFixed(2);
	document.getElementById('fm').value = fm.toFixed(2);
	document.getElementById('vol_loading').value = vol_loading.toFixed(2);
	document.getElementById('sludge_waste').value = sludge_waste.toFixed(2);
	document.getElementById('q_w').value = q_w.toFixed(2);
	document.getElementById('rec_ratio').value = rec_ratio.toFixed(2);
	document.getElementById('req_oxygen').value = req_oxygen.toFixed(2);
	document.getElementById('air_req').value = air_req.toFixed(2);

}

//Extended Aeration
function post_extended(){
	error = document.getElementById('error');
	error.innerHTML = "";
	var inflow, in_bod, ef_bod, mlvss, mlss, ss, a_mlvss, mcrt, efficiency;

	inflow = $("#inflow").val();
	in_bod = $("#in_bod").val();
	ef_bod = $("#ef_bod").val();

	if(inflow <= 0){
		error.innerHTML += "Please enter inflow quantity.<br/>";
	}
	if(in_bod <= 0){
		error.innerHTML += "Please enter influent BOD.<br/>";
	}
	if(ef_bod <= 0){
		error.innerHTML += "Please enter effluent BOD.<br/>";
	}

	// Assumptions
	n_var = 0.7; // n_var = mlvss/mlss
	ss = 10000;

	efficiency = ((in_bod - ef_bod) / in_bod) * 100;

	kd = 0.07;
	y = 0.6;
	if (!optimizePostExtended) {
		mcrt = 30; // 20 to 30 days
		x = 2800; // MLVSS in aeration tank
		vol = ((inflow*mcrt*y*(in_bod - ef_bod)) / (x*(1 + kd*mcrt)));
	}else if (optimizePostExtended){
		$('#loading').modal('show');
		var DataArray = [];
		for (var i = 20; i < 31; i++) {
			var graphDataArray = [];
			for (count = 3000; count < 6001; count++ )//Count is alias of X (MLVSS)
			 {
				graphDataArray.push(
					{"x": count ,"y": ((inflow*i*y*(in_bod - ef_bod)) / (count*(1 + kd*i)))}
					);
				count = count + 99;
			}
			DataArray.push(graphDataArray);
		}
		$('#loading').modal('hide');

		$('#optimize').modal('show');

		renderGraph(DataArray,'extended');
		var res = [];
		var obj = [];
		for (var i = 0; i < DataArray.length; i++) {
			res[i] = Math.min.apply(Math,DataArray[i].map(function(o){return o.y;}));
			obj[i] = DataArray[i].find(function(o){ return o.y == res[i]; });
		}
		var finalRes = Math.min.apply(Math,obj.map(function(o){return o.y;}));
		var finalObj = obj.find(function(o){ return o.y == finalRes; });
		x = finalObj['x'];
		vol = finalObj['y'];
		for (var i = 0; i < obj.length; i++) {
			if (obj[i]['x'] == x && obj[i]['y'] == vol ) {
				var flag = i;
			}
		}
		mcrt = flag + 20;
	}

	hrt = (vol*24) / inflow;
	do{
		if(hrt > 36){
			vol = vol * 0.95;
			hrt = (vol*24) / inflow;
		}
		if(hrt < 18){
			vol = vol * 1.05;
			hrt = (vol*24) / inflow;
		}
	}while(hrt < 18 || hrt > 36)

	fm = (inflow*in_bod) / (vol*x);
	if(fm < 0.05 || fm > 0.2){
		error.innerHTML += "F/M ratio is not in between 0.05 and .15, Extended Aeration Process is not recommended.<br/>";
	}else if(fm > 0.05 && fm <= 0.2){
		// Extended
	}
	if(error.innerHTML != ""){
		$('#mymodal').modal('show');
		return false;
	}

	vol_loading = (inflow * in_bod) / (vol*1000);

	//sludge waste
	yobs = y/(1 + kd*mcrt);
	px = (yobs*inflow*(in_bod - ef_bod))/1000;
	sludge_waste = px/n_var;

	//Sludge waste volume based on mean cell residence time
	q_w = (vol*x)/(mcrt*ss*n_var);

	//Recirculation ratio
	rec_ratio = x/(ss*n_var - x);

	//Estimation of air requirement 
	req_oxygen = (inflow*(in_bod - ef_bod))/(0.68*1000) - (1.42*q_w*ss*n_var)/1000;

	//Volume of air required
	vol_air = req_oxygen/(1.201 * 0.23*.08);
	air_req = (vol_air/(24*60))*2;

	//Check for air volume
	air_req_p_vol = vol_air/inflow;


	//Ouput
	document.getElementById('efficiency').value = efficiency.toFixed(2);
	document.getElementById('vol').value = vol.toFixed(2);
	document.getElementById('hrt').value = hrt.toFixed(2);
	document.getElementById('fm').value = fm.toFixed(2);
	document.getElementById('vol_loading').value = vol_loading.toFixed(2);
	document.getElementById('sludge_waste').value = sludge_waste.toFixed(2);
	document.getElementById('q_w').value = q_w.toFixed(2);
	document.getElementById('rec_ratio').value = rec_ratio.toFixed(2);
	document.getElementById('req_oxygen').value = req_oxygen.toFixed(2);
	document.getElementById('air_req').value = air_req.toFixed(2);

}

function optimize_post(x){
	if (x == 'asp') {
		optimizePostAsp = true;
		post_asp();
		optimizePostAsp = false;
	}else if(x == 'extended') {
		optimizePostExtended = true;
		post_extended();
		optimizePostExtended = false;
	}

}

function renderGraph(DataArray, process){
	if (process == 'asp') {
		var mcrtValues = [5,6,7,8,9,10,11,12,13,14,15];
		var mcrtName = "MCRT = 5";
	}else if (process == 'extended') {
		var mcrtValues = [20,21,22,23,24,25,26,27,28,29,30];
		var mcrtName = "MCRT = 20";
	}
	var chart = new CanvasJS.Chart("chartContainer", {
	  animationEnabled: true,  
	  title:{
	    text: "Optimizing the volume"
	  },
	  axisY: {
	    title: "Volume ",
	    suffix: "m3"
	  },
	  axisX: {
	    title: "MLVSS (mg/L) "
	  },
		legend:{
			cursor: "pointer",
			fontSize: 16
		},
		toolTip:{
			shared: true
		},
	  data: [{
	  	name: mcrtName,
	    yValueFormatString: "#,### Units",
	    xValueFormatString: "YYYY",
	    type: "spline",
	    showInLegend: true,
	    dataPoints: DataArray[0]
	  },
	  {
	  	name: mcrtValues[1].toString(),
	    yValueFormatString: "#,### Units",
	    xValueFormatString: "YYYY",
	    type: "spline",
	    showInLegend: true,
	    dataPoints: DataArray[1]
	  },
	  {
	  	name: mcrtValues[2].toString(),
	    yValueFormatString: "#,### Units",
	    xValueFormatString: "YYYY",
	    type: "spline",
	    showInLegend: true,
	    dataPoints: DataArray[2]
	  },
	  {
	  	name: mcrtValues[3].toString(),
	    yValueFormatString: "#,### Units",
	    xValueFormatString: "YYYY",
	    type: "spline",
	    showInLegend: true,
	    dataPoints: DataArray[3]
	  },
	  {
	  	name: mcrtValues[4].toString(),
	    yValueFormatString: "#,### Units",
	    xValueFormatString: "YYYY",
	    type: "spline",
	    showInLegend: true,
	    dataPoints: DataArray[4]
	  },
	  {
	  	name: mcrtValues[5].toString(),
	    yValueFormatString: "#,### Units",
	    xValueFormatString: "YYYY",
	    type: "spline",
	    showInLegend: true,
	    dataPoints: DataArray[5]
	  },
	  {
	  	name: mcrtValues[6].toString(),
	    yValueFormatString: "#,### Units",
	    xValueFormatString: "YYYY",
	    type: "spline",
	    showInLegend: true,
	    dataPoints: DataArray[6]
	  },
	  {
	  	name: mcrtValues[7].toString(),
	    yValueFormatString: "#,### Units",
	    xValueFormatString: "YYYY",
	    type: "spline",
	    showInLegend: true,
	    dataPoints: DataArray[7]
	  },
	  {
	  	name: mcrtValues[8].toString(),
	    yValueFormatString: "#,### Units",
	    xValueFormatString: "YYYY",
	    type: "spline",
	    showInLegend: true,
	    dataPoints: DataArray[8]
	  },
	  {
	  	name: mcrtValues[9].toString(),
	    yValueFormatString: "#,### Units",
	    xValueFormatString: "YYYY",
	    type: "spline",
	    showInLegend: true,
	    dataPoints: DataArray[9]
	  },
	  {
	  	name: mcrtValues[10].toString(),
	    yValueFormatString: "#,### Units",
	    xValueFormatString: "YYYY",
	    type: "spline",
	    showInLegend: true,
	    dataPoints: DataArray[10]
	  }
	  ]
	});
	chart.render();

}