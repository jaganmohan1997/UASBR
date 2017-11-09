// FlowSheet
function flowAnalyze() {
	result = document.getElementById('result');
	error = document.getElementById('error');
	result.innerHTML = "";
	error.innerHTML = "";
	var type, cod, bod, ss, temp,  phmin, phmax, flact, grit, float, disp, ratio, eff, b_eff, codo, oil, codr, check_cod, eff_bod;
	type = (document.querySelector('input[name = "type"]:checked').value);
	cod = (document.getElementById('cod').value);
	bod = (document.getElementById('bod').value);
	temp = (document.getElementById('temp').value);
	phmin = (document.getElementById('phmin').value);
	phmax = (document.getElementById('phmax').value);
	ss = (document.getElementById('ss').value);
	oil = (document.getElementById('oil').value);
	flact = document.querySelector('input[name = "flact"]:checked').value;
	grit = document.querySelector('input[name = "grit"]:checked').value;
	float = document.querySelector('input[name = "float"]:checked').value;
	disp = document.querySelector('input[name = "disp"]:checked').value;

	if(cod <= 0){
		error.innerHTML += "You have not entered correct COD.<br/>";
	}
	if(cod > 1000 && type == 1){
		error.innerHTML += "You must choose <b>Industrial Wastewater</b> as input parameter.<br/>";
	}
	codo = cod;
	if(cod <= 750){
		eff = 0.65;
	}else if(cod >= 750 && cod < 10000){
		eff = 0.8;
	}else{
		eff = 0.75;
	}
	if(bod <= 0){
		error.innerHTML += "You have not entered correct BOD.<br/>";
	}
	if(cod <= 250 && bod <= 30){
		error.innerHTML += "No treatment is required.<br/>";
	}
	if(temp <= 0){
		error.innerHTML += "You have not entered correct Temperature.<br/>";
	}
	if(phmin <= 0){
		error.innerHTML += "You have not entered correct Minimum pH.<br/>";
	}
	if(phmax <= 0){
		error.innerHTML += "You have not entered correct Maximum pH.<br/>";
	}
	if(ss <= 0){
		error.innerHTML += "You have not entered correct SS Concentration.<br/>";
	}
	if(temp <= 8){
		error.innerHTML += "Application of Biological Treatment is not advisable.<br/>";
	}

	type = parseFloat(document.querySelector('input[name = "type"]:checked').value);
	cod = parseFloat(document.getElementById('cod').value);
	bod = parseFloat(document.getElementById('bod').value);
	temp = parseFloat(document.getElementById('temp').value);
	phmin = parseFloat(document.getElementById('phmin').value);
	phmax = parseFloat(document.getElementById('phmax').value);
	ss = parseFloat(document.getElementById('ss').value);
	oil = parseFloat(document.getElementById('oil').value);
	flact = document.querySelector('input[name = "flact"]:checked').value;
	grit = document.querySelector('input[name = "grit"]:checked').value;
	float = document.querySelector('input[name = "float"]:checked').value;
	disp = document.querySelector('input[name = "disp"]:checked').value;

	ratio = cod/bod;
	if(ratio < 1.5){
		error.innerHTML += "Enter correct COD and BOD values.<br/>"
	}else if(ratio > 8){
		error.innerHTML += "Biological treatment methods are not feasible.Chemical treatment should be given first<br/>"
	}else if(error.innerHTML == ""){
		alert("Biological treatment can be given.");
	}
	if(error.innerHTML != ""){
		$('#mymodal').modal('show');
		return false;
	}
	// Screen
	if(float == 1){
		result.innerHTML = '<span class="flow">Screen</span>';
	}
	// Grit
	if(grit == 1){
		result.innerHTML += '<span class="flow">Grit</span>';
	}
	// PST
	if(ss > 400){
		result.innerHTML += '<span class="flow">P.S.T</span>';
	}else if(ss/cod > 0.5){
		result.innerHTML += '<span class="flow">P.S.T</span>';
	}
	// Skimming Tank
	if(oil > 30){
		result.innerHTML += '<span class="flow">Skimming Tank</span>';
	}
	// Equalization Tank
	if(flact == 1){
		if(temp > 60){
			result.innerHTML += '<span class="flow">Equalization cum Cooling tank</span>';
		}else{
			result.innerHTML += '<span class="flow">Equalization Tank</span>';
		}
	}else if(temp > 60){
			result.innerHTML += '<span class="flow">Cooling Tank</span>';
	}
	// Neutralization Tank
	if(error.innerHTML == ""){
		if(phmin < 5.5 || phmax > 8.5){
			result.innerHTML += '<span class="flow">Neutralization Tank</span>';
		}
	}
	codr = codo;
	var boolchk = 1;
	// 1 = True n  2 = False
	if(disp == 1){
		if(type == 1){
			if(bod >= 100){
				boolchk = 2;
				console.log(boolchk);
			}
		}else if(codr > 250){
			boolchk = 2;
		}
	}else{
		if(type == 2){
			if(codr >= 250 || bod >= 50){
				boolchk = 2;
			}
		}else{
			eff_bod = bod - bod * 0.3;
			if(eff_bod >= 30){
				boolchk = 2;
			}
		}
	}

	if(boolchk == 2){
		result.innerHTML += '<span class="flow">UASBR</span>';
		var nouasb = 1;
		codr = codo - eff * codo;
		codo = codr;
		if(codr > 1500){
			do{
				result.innerHTML += '<span class="flow">UASBR</span>';
				nouasb = nouasb + 1;
				codr = codo - eff * codo;
        codo = codr;
			}while(nouasb < 2);
		}

		if(disp == 1){
			check_cod = 100 * ratio;
			if(type == 1){
				eff_bod = bod - bod * eff;
				if(eff_bod >= 100){
					// Aeration Tank
					result.innerHTML += '<span class="flow">Aeration Tank</span>';
				}
			}else{
				codo = codr;
				do{
					result.innerHTML += '<span class="flow">A.S.P</span>';
					//console.log("ASP1");
					codr = codo - eff * codo;
					codo = codr;
				}while(codr > check_cod);
			}
		}else{
			eff_bod = codr/ratio;
			if(type == 2){
				if(codr >= 250 || eff_bod >= 50){
					codo = codr;
					eff = 0.8;
					do{
						var last1 = $("#result span:nth-last-child(1)").text();
						if(last1.trim() == "A.S.P" && bod <= 3000){
							break;
						}
						result.innerHTML += '<span class="flow">A.S.P</span>';
						console.log("ASP2");
						codr = codo - eff * codo;
						codo = codr;
						eff_bod = codr / ratio;
					}while(codr >= 250 || eff_bod >= 50);
				}
			}else{
				eff_bod = bod - bod*eff;
				if(eff_bod >= 30){
					//Aeration Tank
					result.innerHTML += '<span class="flow">Aeration Tank</span>';
				}
			}
		}
	}

	//S.S.T
	var last2 = $("#result span:nth-last-child(1)").text();
	console.log(last2);
	if(last2.trim() != "A.S.P"){
		result.innerHTML += '<span class="flow">S.S.T</span>';
	}else{
		//result.innerHTML += '';
		last2 = "";
	}

}

//Grit
function gritAnalyze(){
	result = document.getElementById('result');
	error = document.getElementById('error');
	result.innerHTML = "";
	error.innerHTML = "";
	var inflow, length, width1, depth, cs_area, vol_req, vol_req1, vol_pro;
	inflow_n = document.getElementById('inflow').value;
	inflow = inflow_n/86400;
	if(inflow <= 0){
		error.innerHTML += "You have not entered correct inflow.<br/>";
	}
	if(error.innerHTML != ""){
		$('#mymodal').modal('show');
		return false;
	}
	length = 60 * 0.2;
	cs_area = inflow / 0.2;
	vol_req = 60 * inflow;
	depth = 0.7;
	nou = 1;
	vol_req1 = vol_req;
	cs_area1 = cs_area;
	do{
		do{
			width1 = cs_area1 / depth;
			if(width1 < 0.6){
	  	width1 = 0.6;
			}else if(width1 > 1.5){
	    width1 = 1.5;
	  }
	  vol_pro = length * width1 * depth;
	  if(vol_pro >= vol_req1){
	  	break;
	  }else{
	  	depth = depth + 0.1;
	  }
		}while(depth < 1.6);
		if(vol_pro >= vol_req1){
			break;
		}else{
			nou = nou + 1;
			vol_req1 = vol_req / nou;
			cs_area1 = cs_area / nou;
			depth = 0.7;
		}
	}while(vol_pro < vol_req1);
	f_depth = depth + 0.25 + 0.3;
	//result.innerHTML += length.toFixed(3)  + "<br/>" + width1.toFixed(3) + "<br/>" + f_depth.toFixed(3) + "<br/>" + nou;
	document.getElementById('length').value = length.toFixed(3);
	document.getElementById('width').value = width1.toFixed(3);
	document.getElementById('height').value = f_depth.toFixed(3);
	document.getElementById('nou').value = nou;
}

//Screen
function screenAnalyze(){
	result = document.getElementById('result');
	error = document.getElementById('error');
	result.innerHTML = "";
	error.innerHTML = "";
	var inc, maxflow, minflow, avgflow, g_width, depth;
	maxflow_n = document.getElementById('maxflow').value;
	minflow_n = document.getElementById('minflow').value;
	avgflow_n = document.getElementById('avgflow').value;
	maxflow = maxflow_n / 86400;
	minflow = minflow_n / 86400;
	avgflow = avgflow_n / 86400;
	wayc = document.querySelector('input[name = "wayc"]:checked').value;
	if(wayc == 1){
		inc = (45 * (22 / 7) / 180);
	}else{
		inc = (60 * (22 / 7) / 180);
	}
	if(avgflow <= 0){
		error.innerHTML += "You have not entered correct Average Flow.<br/>";
	}
	if(error.innerHTML != ""){
		$('#mymodal').modal('show');
		return false;
	}
	var nobars = 20;
 	var submg_area = (avgflow / 0.3);
 	var gr_submg_a = submg_area / 0.833;
 	var cs_area = gr_submg_a * Math.sin(inc);
 	var cl_vel = (avgflow / cs_area);
 	if(cl_vel < 0.375){
 		cl_vel = 0.375;
  	cs_area = (avgflow / cl_vel);
 	}
 	h = 2.42 * Math.pow(6 / 15, 4 / 3) * (Math.pow(cl_vel, 2) / 19.62);
 	console.log(h);
 	do{
 		if(h > 0.08){
 			g_width = g_width + 0.1;
      cl_vel = avgflow / (g_width * depth);
 		}else{
 			g_width = Math.sqrt(cs_area);
 		}

 		if( g_width < 0.2){
 			g_width = 0.2;
      depth = cs_area / g_width;
 		}else{
 			depth = g_width;
 		}
 		nobars = g_width / 0.03;
 		if( (nobars - Math.floor(nobars)) > 0.5){
 			nobars = Math.floor(nobars) + 1;
 		}else{
 			nobars = Math.floor(nobars);
 		}
 		depth_channel = depth + 0.25;
    g_width = nobars * 0.006 + (nobars + 1) * 0.03;
    R = (depth * 0.75) / (2 * depth + 0.75);
    slope = Math.pow((((0.013 * cl_vel) / Math.pow(R, 2 / 3))), 2);
    slope = 1 / slope;
    h = 2.42 * Math.pow(6 / 15, (4 / 3)) * Math.pow(cl_vel, 2 / 19.62);
 	}while(h <= 0.08);
 	//result.innerHTML += "0.006"  + "<br/>" + "0.03" + "<br/>" + g_width + "<br/>" + depth_channel.toFixed(3) + "<br/>" + "1 in " + Math.floor(slope);
 	document.getElementById('dia').value = 0.006;
	document.getElementById('space').value = 0.03;
	document.getElementById('width').value = g_width;
	document.getElementById('depth').value = depth_channel.toFixed(3);
	document.getElementById('slope').value = "1 in " + Math.floor(slope);
}

//PST
function pstAnalyze(){
	result = document.getElementById('result');
	error = document.getElementById('error');
	result.innerHTML = "";
	error.innerHTML = "";
	var inf, area_req, area_pro, dia, depth;
	inf = document.getElementById('inf').value;
	if(inf <= 0){
		error.innerHTML += "You have not entered correct value.<br/>";
	}
	if(error.innerHTML != ""){
		$('#mymodal').modal('show');
		return false;
	}
	sur_area = inf / 35;
	area = ((22 / 7) * (40 ^ 2)) / 4;
	vol_req = (inf / 24) * 1.5;
	vol_req1 = vol_req;
	area_req = sur_area;
	nou = 1;
	do{
		do{
			if(area > area_req){
				break;
			}else{
				nou = nou + 1;
    		area_req = sur_area / nou;
			}
		}while(area < area_req);
		dia = Math.sqrt((4 * area_req) / (22 / 7));
		if(dia < 1){
			dia = 1;
		}
		f_area = ((22 / 7) * (Math.pow(dia, 2))) / 4;
   	inf_u = inf / nou;
   	depth = ((inf_u / 24) * 1.5) / f_area;
   	if(depth < 2.15){
   		depth = 2.15;
   	}else if(depth > 4){
   		depth = 4;
   	}
   	vol_pro = nou * f_area * depth;
   	if(vol_pro >= vol_req){
   		break;
   	}else{
   		do{
   			depth = depth + 0.5;
    		vol_pro = f_area * depth;
    		if(vol_pro >= vol_req){
    			break;
    		}
   		}while(depth < 4.5);
   		nou = nou + 1;
   	}
	}while(vol_pro < vol_req1);
	f_depth = depth + 0.25 + 0.3;
	//result.innerHTML += dia.toFixed(3) + "<br/>" + f_depth.toFixed(3) + "<br/>" + nou + "<br/>" + "1 in 100";
	document.getElementById('dia').value = dia.toFixed(3);
	document.getElementById('height').value = f_depth.toFixed(3);
	document.getElementById('slope').value = "1 in 100";
	document.getElementById('nou').value = nou;
}

//Capacity
function capAnalyze(){
	result = document.getElementById('result');
	error = document.getElementById('error');
	result.innerHTML = "";
	error.innerHTML = "";
	var inflow, reqInflow, reqInflow1, reqInflow2, reqInflow3, cod ,sscon ;
	var rHeight, rDia, rLength, rWidth, olr, slr, upv , area, vol, olr_max, olr_min;
	inflow = $("#inflow").val();
	cod_n = $("#cod").val();
	ssconc = $("#ssconc").val();
	rHeight = $("#rHeight").val();
	shape = $("input[name=shape]:checked").val();
	cod = cod_n / 1000;
	if(shape == 1){
		rDia = $("#rDia").val();
		if(rDia <= 0){
			error.innerHTML += "Enter valid reactor Diameter.<br/>";
		}
		area = ((22 / 7) * (Math.pow(rDia, 2))) / 4;
	}else{
		rLength = $("#rLength").val();
		rWidth = $("#rWidth").val();
		if(rLength <= 0){
			error.innerHTML += "Enter valid reactor Length.<br/>";
		}
		if(rWidth <= 0){
			error.innerHTML += "Enter valid reactor Width.<br/>";
		}
		area = rLength * rWidth;
	}
	if(inflow <= 0){
		error.innerHTML += "Enter valid reactor Inflow.<br/>";
	}
	if(cod <= 0){
		error.innerHTML += "Enter valid reactor Influent COD.<br/>";
	}
	if(ssconc <= 0){
		error.innerHTML += "Enter valid reactor S.S. Concentration.<br/>";
	}
	if(rHeight <= 0){
		error.innerHTML += "Enter valid reactor Height.<br/>";
	}
	if(error.innerHTML != ""){
		$('#mymodal').modal('show');
		return false;
	}
	vol = area * rHeight;
	olr = (inflow * cod) / vol;
	switch(true){
		case(cod > 0 && cod <= 0.75):
			olr_min = 1.5;
    	olr_max = 3;
    	break;
    case(cod > 0.75 && cod <= 3):
			olr_min = 3;
    	olr_max = 7;
    	break;
    case(cod > 3 && cod <= 10):
			olr_min = 5;
    	olr_max = 10;
    	break;
    case(cod > 10):
			olr_min = 5;
    	olr_max = 15;
    	break;
	}
	//console.log(area + " " + cod + " " + olr + " " + olr_min + " " + olr_max);
	reqInflow1 = 0;
	reqInflow2 = 0;
	reqInflow3 = 0;
	reqInflow = 0;
	if(olr < olr_min || olr > olr_max){
		olr = olr_max;
    reqInflow1 = (olr * vol) / cod;
	}
	s_vol = ssconc * 0.4 * vol;
	slr = (inflow * cod) / s_vol;
	if(slr < 0.1 || slr > 0.6){
		slr = 0.6;
    reqInflow2 = (slr * s_vol) / cod;
	}
	upv = inflow / (area * 24);
	if(upv > 0.7){
		reqInflow3 = 0.7 * area * 24;
	}
	//console.log(reqInflow1);
	if(reqInflow1 != 0 && reqInflow2 != 0){
		if(reqInflow1 > reqInflow2){
			reqInflow = reqInflow2;
		}else{
			reqInflow = reqInflow1;
		}
	}else{
		if(reqInflow1 != 0){
			reqInflow = reqInflow1;
		}else if(reqInflow2 != 0){
			reqInflow = reqInflow2;
		}
	}
	//console.log(reqInflow);
	if(reqInflow != 0 && reqInflow3 != 0){
		if(reqInflow > reqInflow3){
			reqInflow = reqInflow3;
		}
	}else{
		if(reqInflow3 != 0){
			reqInflow = reqInflow3;
		}
	}
	//console.log(reqInflow);
	if(reqInflow == 0){
		reqInflow = inflow;
	}
	document.getElementById('reqInflow').value = reqInflow.toFixed(2);
}

//Own Design
var strnote;
function own_reactor(){
	result = document.getElementById('result');
	error = document.getElementById('error');
	document.getElementById('strFilter').innerHTML = "";
	result.innerHTML = "";
	error.innerHTML = "";
	var inflow, cod, olr, slr, s, hrt, h, upv, area, r_vol, height1, width1, length1, dia, s_vol, vss;
	var f_vol, no1, mina, f_dia, tempa, pi, Opt1, Opt2, int1, inletno, dif, olr_req, strFilter;
	inflow = $("#inflow").val();
	cod_n = $("#cod").val();
	olr = $("#olr").val();
	cod = cod_n / 1000;
	shape = $("input[name=shape]:checked").val();
	if(inflow <= 0){
		error.innerHTML += "You have not entered Inflow.<br/>";
	}
	if(olr <= 0){
		error.innerHTML += "Please eneter OLR.<br/>";
	}
	if(cod <= 0){
		error.innerHTML += "Please enter COD.<br/>";
	}
	if(error.innerHTML != ""){
		$('#mymodal').modal('show');
		return false;
	}
	switch(true){
		case(cod > 0 && cod <= 10):
			height1 = 6;
    	break;
    case(cod > 10):
			height1 = 8;
    	break;
	}
	slr = 0.1
  r_vol = (inflow * cod) / olr;      //REACTOR VOLUME
  vss = (inflow * cod) / slr;        //Kg VSS
  s_vol = vss / 25;                  //SLUDGE VOLUME
  if( s_vol < (0.5 * r_vol) ){
  	hrt = r_vol / (inflow / 24);
    h = hrt;
    p_height();
    p_print();
  }else{
  	p_subslr();
  	hrt = r_vol / (inflow / 24);
   	h = hrt;
    p_height();
    if(h > 24){
    	hrt = h;
      upv = 8 / hrt;
      height1 = 8;
    }
  }
  if(hrt < 6){
  	olr_req = cod * 24 / 6;
  }
  if(slr > 1){
  	error.innerHTML += "Design is not possible at this loading.<br/>";
  	$('#mymodal').modal('show');
		return false;
  }else{
  	p_print();
  	tempa = 0;
  	if(shape == 1){
  		Opt1 = 1;
  		p_areas();
  		document.getElementById('length').value = length1.toFixed(3);
  		document.getElementById('width').value = width1.toFixed(3);
  		document.getElementById('nou').value = no1;
  	}
  	if(shape == 2){
  		Opt1 = 2;
  		p_areac();
  		document.getElementById('dia').value = f_dia.toFixed(3);
  		document.getElementById('nou').value = no1;
  	}
  	document.getElementById('inlet').value = inletno;
  	$(".disb").removeAttr("disabled");
  }
  c = 0;
  if(upv > 0.7){
  	c = 1;
  }
  if(olr > 15){
  	c = 1;
  }
  if(hrt < 6){
  	c = 1;
  	textbox = "The HRT used is very less, hence it is recommended to adopt OLR less than " + olr_req.toFixed(2) + " kg COD /cum.day for design";
  	document.getElementById('strFilter').innerHTML = textbox;
  }
  if(c == 1){
  	strnote = 1;
  	document.getElementById('strFilter').innerHTML = "The reactor may not give higher COD removal effeciency." + textbox;
  }

  // Inside Functions
  function p_print(){
  	document.getElementById('vol').value = r_vol.toFixed(3);
  	document.getElementById('area').value = (r_vol / height1).toFixed(3);
  	document.getElementById('hrt').value = hrt.toFixed(2);
  	document.getElementById('height').value = height1;
  	document.getElementById('olr1').value = olr;
  	document.getElementById('upv').value = upv.toFixed(3);
  	document.getElementById('slr').value = slr.toFixed(2);
  }

  function p_height(){
		do{
			upv = height1 / hrt;
			if(upv >= 0.25 && upv <= 0.7){
				break;
			}else{
				height1 = height1 - 0.5;
			}
		}while(height1 >= 4);
		if(height1 < 4){
			height1 = 4;
	    upv = height1 / hrt;
		}
	}

	function p_subslr(){
		do{
			vss = (inflow * cod) / slr;
	    s_vol = vss / 35;
	    if(s_vol < (0.5 * r_vol)){
	    	break;
	    }else{
	      slr = slr + 0.1;
	    }
		}while(slr < 1.1);
	}

	function p_areac(){
		var a = [], d = [], j, no = [], k,
		pi = 22 / 7;
		area = r_vol / height1;
		if(area > 28.27){
			d[0] = 6;
		 	d[1] = 7;
		 	d[2] = 8;
		 	d[3] = 9;
		 	d[4] = 10;
		 	for(j = 0; j <= 4; j++){
		 		a[j] = Math.pow(((pi / 4) * (d[j])), 2);
		 	}
		 	for(j = 0; j <= 4; j++){
		 		no[j] = Math.floor(area / a[j]) + 1;
		 	}
		 	mina = no[0] * a[0];
		 	for(j = 1; j <= 4; j++){
		 		for(k = 1; k <= j; k++){
		 			if(mina > no[k] * a[k]){
		 				mina = no[k] * a[k];
		 			}
		 		}
		 	}
		 	for(j = 4; j >= 0; j--){
		 		if(mina == a[j] * no[j]){
		 			tempa = area / no[j];
   				no1 = no[j];
   				f_dia = Math.sqrt((4 * tempa) / pi);
		 		}
		 	}
		}else{
			tempa = area;
 			f_dia = Math.sqrt((4 * area) / pi);
 			no1 = 1;
		}
		tempa = Math.pow((pi / 4) * (f_dia), 2);
		p_inletnos(tempa);
	}

	function p_inletnos(a){
		if(a < 1){
			inletno = 1;
			return false;
		}
		if(a >= 1 && a <= 5){
			if((a - Math.floor(a)) > 0.5){
				inletno = Math.floor(a) + 1;
			}else{
				inletno = Math.floor(a);
			}
		}else{
			if(olr <= 2){
				inletno = Math.floor(a / 1) + 1;
			}else{
				dif = (a / 2) - Math.floor(a / 2);
				if(dif >= 0.5){
					inletno = Math.floor(a / 2) + 1;
				}else{
					inletno = Math.floor(a / 2);
				}
			}
		}
	}
	
	function p_areas(){
		area = r_vol / height1;
		if(area > 100){
			width1 = parseFloat(prompt("Enter width of the reactor.Note that it should not be grater than 10m"));
			if(width1 == 0){
				width1 = 5;
			}
			length1 = area / width1;
 			int1 = Math.floor(length1 / width1);
 			dif = (length1 / width1) - int1;
 			if(dif >= 0.5){
 				no1 = int1 + 1;
 			}else{
 				no1 = int1;
 			}
 			tempa = area / no1;
 			length1 = tempa / width1;
		}else{
			tempa = area;
 			length1 = Math.sqrt(area);
 			width1 = length1;
 			no1 = 1;
		}
		tempa = length1 * width1
		p_inletnos(tempa)
	}

	// Inside Function End

}

//Lower Efficiency
function lower_efficiency(){
	result = document.getElementById('result_eff');
	correct = document.getElementById('correct_eff');
	error = document.getElementById('error');
	result.innerHTML = "";
	correct.innerHTML = "";
	error.innerHTML = "";
	$(".parameter").show();
	$(".reco").hide();
	var inf, cod_i, cod_e, olr_d, olr_r, vfa, nit, phos, srt, ht, ph, gasp, rvol, calcium;
	var k;
	inf = $("#inflow").val();
	cod_i = $("#cod_i").val();
	cod_e = $("#cod_e").val();
	olr_d = parseFloat($("#olr_d").val());
	rvol = $("#rvol").val();
	temp = $("#temp").val();
	ph = $("#ph").val();
	calcium = $("#calcium").val();
	vfa = $("#vfa").val();
	nit = $("#nit").val();
	phos = $("#phos").val();
	ht = $("#ht").val();
	gasp = $("#gasp").val();
	effd = $("#effd").val();
	if(inf <= 0){
		error.innerHTML += "Please enter inflow quantity.<br/>";
	}
	if(cod_i <= 0){
		error.innerHTML += "Please enter influent COD.<br/>";
	}
	if(cod_e <= 0){
		error.innerHTML += "Please enter effluent COD.<br/>";
	}
	if(olr_d <= 0){
		error.innerHTML += "Please enter design OLR.<br/>";
	}
	if(rvol <= 0){
		error.innerHTML += "Please enter reactor volume.<br/>";
	}
	if(temp <= 0){
		error.innerHTML += "Please enter wastewater temperature.<br/>";
	}
	if(ph <= 0){
		error.innerHTML += "Please enter height of reactor.<br/>";
	}
	if(nit <= 0){
		k = 1;
	}
	if(phos <= 0){
		k = 1;
	}
	if(ht <= 0){
		error.innerHTML += "Please enter height of reactor.<br/>";
	}
	if(gasp <= 0){
		error.innerHTML += "Please enter gas production<br/>";
	}
	if(effd <= 0){
		error.innerHTML += "Please enter design efficiency.<br/>";
	}
	if(error.innerHTML != ""){
		$('#mymodal').modal('show');
		return false;
	}
	eff = ((cod_i - cod_e) / cod_i) * 100;
	if(eff > (0.9 * effd)){
		if(eff > effd){
			$(".parameter").hide();
			$(".reco").show();
			document.getElementById('recot').innerHTML = '<span class="flow">As compared to designed efficiency, the existing efficiency is higher.</span>';
		}else{
			$(".parameter").hide();
			$(".reco").show();
			document.getElementById('recot').innerHTML = '<span class="flow">As compared to designed efficiency, there is no considerable difference in existing efficiency.</span>';
			//As compared to designed efficiency, there is no considerable difference in existing efficiency
		}
	}else{
		olr_r = (inf * (cod_i / 1000)) / rvol;
		if( olr_d.toFixed(3) < olr_r.toFixed(2) ){
			result.innerHTML += '<span class="flow">OLR</span>';
			if(olr_r.toFixed(2) < 0.7){
				correct.innerHTML = '<span class="flow">The lowering of efficiency may be due to very low loading ,resulting in improper mixing.</span>';
			}
			if(olr_r.toFixed(2) > (1.5 * olr_d).toFixed(3)){
				correct.innerHTML = '<span class="flow">The lowering of efficiency may be due to  overloading of the reactor.</span>';
			}
		}
		if(temp < 15 || temp > 60){
			result.innerHTML += '<span class="flow">Temperature</span>';
			if(temp < 15){
				correct.innerHTML += '<span class="flow">The lowering of efficiency may be due to very low temperature of the influent.</span>';
			}
			if(temp > 60){
				correct.innerHTML += '<span class="flow">The lowering of efficiency may be due to very high temperature of the influent.</span>';
			}
		}
		if(ph < 6.8 || ph > 8.5){
			result.innerHTML += '<span class="flow">pH</span>';
			if(ph < 6.8){
				correct.innerHTML += '<span class="flow">The lowering of efficiency may be due to lower pH. Add bicarbonate alkalinity.</span>';
			}
			if(ph > 8.5){
				correct.innerHTML += '<span class="flow">The lowering of efficiency may be due to high pH. Add acid. </span>';
			}
		}
		if(vfa > 300){
			result.innerHTML += '<span class="flow">VFA</span>';
			alka = ((vfa - 300) * 1.7);
			correct.innerHTML += '<span class="flow">Add alkalinity of about ' + alka + ' mg/L.</span>';
		}
		if(vfa <= 0){
			correct.innerHTML += '<span class="flow">Check for volatile acids concentration in the reactor.</span>';
		}
		if( k == 1){
			if(nit < 0 || (cod_i / nit) < 70){
				result.innerHTML += '<span class="flow">Nitrogen</span>';
			}
			if(phos < 0 || (cod_i / phos) < 350){
				result.innerHTML += '<span class="flow">Phosphorous</span>';
			}
			correct.innerHTML += '<span class="flow">Check for nutrients in the influent."</span>';
		}else{
			if((cod_i / nit) > 70){
				result.innerHTML += '<span class="flow">Nitrogen</span>';
				correct.innerHTML += '<span class="flow">The lowering of efficiency may be due to low Nitrogen content.</span>';
			}else{
				if((nit / cod_i) > 0.15){
					correct.innerHTML += '<span class="flow">Denitrification interference.</span>';
				}
			}
			if((cod_i / phos) > 350){
				result.innerHTML += '<span class="flow">Phosphorous</span>';
				correct.innerHTML += '<span class="flow">The lowering of efficiency may be due to low Phophorous content.</span>';
			}
		}
		if(calcium < 80){
			correct.innerHTML += '<span class="flow">Increase Calcium concentration in influent.</span>';
		}else{
			if( calcium > 1000){
				correct.innerHTML += '<span class="flow">The lowering of efficiency may be due to calcification of sludge bed.</span>';
			}
		}
		hrt = rvol / (inf / 24);
		if(hrt < 6){
			result.innerHTML += '<span class="flow">HRT</span>';
			correct.innerHTML += '<span class="flow">The lowering of efficiency due to low HRT.</span>';
		}
		upv_r = ht / hrt;
		if(upv_r > 0.7){
			inflow = (0.7 * (rvol / ht)) * 24;
			result.innerHTML += '<span class="flow">Upflow Velocity</span>';
			correct.innerHTML += '<span class="flow">To improve efficiency of the reactor keep inflow = ' + inflow + ' cum/d.</span>';
		}
		if((gasp / rvol) < 0.7){
			correct.innerHTML += '<span class="flow">Improve mixing in the reactor either by increasing loading or by mechanical mixing.</span>';
		}else{
			if((gasp / rvol) > 3){
				correct.innerHTML += '<span class="flow">Lowering of effeciency may be due to vigorous mixing in the reactor; reduce loading.</span>';
			}
		}
		if( correct.innerHTML == ""){
			correct.innerHTML += '<span class="flow">The lowering of efficiency may be due to some other reasons. Detail investigation is required.</span>';
		}
	
	}

}

// Excess SS
function excess_ss(){
	correct = document.getElementById('correct_ss');
	error = document.getElementById('error');
	correct.innerHTML = "";
	error.innerHTML = "";
	var inflow, cod_i, cod_e, eff, sprod, scon, svol;
  var cod_rem, ss_in, ss_eff, inss_d, outss_d, ssflag;
  ssflag = 2; 
	inflow = $("#inflow_ss").val();
	cod_i = $("#cod_i_ss").val();
	cod_e = $("#cod_e_ss").val();
	ss_in = parseFloat($("#ss_in_ss").val());
	ss_eff = $("#ss_eff_ss").val();
	scon = $("#scon_ss").val();
	svol = $("#svol_ss").val();
	if(inflow <= 0){
		error.innerHTML += "You have not entered Inflow.<br/>";
	}
	if(cod_i <= 0){
		error.innerHTML += "You have not entered Influent COD.<br/>";
	}
	if(cod_e <= 0){
		error.innerHTML += "You have not entered Effluent COD.<br/>";
	}
	if(ss_in <= 0){
		error.innerHTML += "You have not entered Influent SS concentration.<br/>";
	}
	if(ss_eff <= 0){
		error.innerHTML += "You have not entered Effluent SS concentration.<br/>";
	}
	if(scon <= 0){
		error.innerHTML += "You have not entered sludge concentration.<br/>";
	}
	if(svol <= 0){
		error.innerHTML += "You have not entered sludge volume.<br/>";
	}
	if(error.innerHTML != ""){
		$('#mymodal').modal('show');
		return false;
	}
	eff = ((cod_i - cod_e) / cod_i);
  cod_rem = inflow * (cod_i / 1000) * eff;
  sprod = 0.05 * cod_rem;
  inss_d = (ss_in / 1000) * inflow;
  outss_d = (ss_eff / 1000) * inflow;
  if(outss_d > (inss_d + sprod)){
  	ssflag = 1;
  }
  if( ss_eff > 500){
  	ssflag = 1;
  }
  th_ss = (svol * scon * 1000) / (50 * inflow);
	if(th_ss < ss_eff){
		correct.innerHTML = '<span class="flow">Add sludge in the reactor inoculum.</span>';
		ssflag = 1;
	}
	if(ssflag == 1){
		text1 = '<span class="flow">Yes, excess SS in effluent exists.</span>';
		text2 = '<span class="flow">Check for leakage of gas in settling compartment.</span>';
		text3 = '<span class="flow">Carry out cleaning, and if required, maintainance of GSS device to stop gas leakage.</span>';
		text4 = '<span class="flow">Reduce loading in the reactor either by reducing flow rate or by reducing influent COD concentration.</span>';
		text5 = '<span class="flow">Reduce liquid upflow velocity by reducing hydraulic loading.</span>';
		$("#correct_ss").prepend(text1, text2, text3, text4, text5);
	}else{
		correct.innerHTML = '<span class="flow">The SS concentration in effluent is not excess.</span>';
	}

}

// Lower Gas Production
function lower_gas_prod(){
	correct = document.getElementById('correct_gas');
	error = document.getElementById('error');
	correct.innerHTML = "";
	error.innerHTML = "";
	var inf, codin, codout, tempc, act_gaspro, scon, svol, dis_gas;
	var tempk, cod_removed, methane_pro, methane_col, cum_methane, th_gas, the_gaspro;;
	inf = $("#inflow_gas").val();
	codin = $("#cod_i_gas").val();
	codout = $("#cod_e_gas").val();
	tempc = $("#temp_gas").val();
	act_gaspro = $("#prod_gas").val();
	var c = 0;
	if(inf <= 0){
		error.innerHTML += "You have not entered Inflow.<br/>";
	}
	if(codin <= 0){
		error.innerHTML += "Enter influent COD.<br/>";
	}
	if(error.innerHTML != ""){
		$('#mymodal').modal('show');
		return false;
	}
	if(tempc <= 10){
		correct.innerHTML += '<span class="flow">This teperature is not siutable for biological treatment.</span>';
		return false;
	}else{
		if(tempc > 60){
			correct.innerHTML = '<span class="flow">This teperature is not siutable for biological treatment.</span>';
			return false;
		}
	}
	if(codin == codout){
		correct.innerHTML = '<span class="flow">Reactor is not performing properly.</span>';
		return false;
	}
	if(codin <= (0.9 * codout)){
		correct.innerHTML = '<span class="flow">Reactor is not performing properly.</span>';
		return false;
	}
	dis_gas = 0.016 * inf;
	tempk = tempc + 273;
 	cod_removed = inf * (codin - codout);
 	methane_pro = (cod_removed / 4);
 	methane_col = (2 / 3) * methane_pro;
 	cum_methane = (1.28 * tempk * cod_removed) / 1000;
 	th_gas = cum_methane / 0.75;
 	the_gaspro = th_gas - dis_gas;
 	console.log(act_gaspro);
 	if(the_gaspro >= act_gaspro){
 		correct.innerHTML = '<span class="flow">Check for gas leakages in GSS device.</span>';
 		correct.innerHTML += '<span class="flow">Check for presence of any toxic material in influent.</span>';
 		correct.innerHTML += '<span class="flow">Confirm availability of trace metals such as Ni,Co,Mo,Fe in influent.</span>';
 		if(tempc < 15){
 			c = 1;
 			correct.innerHTML += '<span class="flow">Low gas production is due to low teperature.</span>';
 		}
 		if(eff_val == 1){
 			if( c == 1){
 				correct.innerHTML += '<span class="flow">The low gas production may be due to low efficiency of the reactor.</span>';
 			}else{
 				$("#correct_gas span:nth-last-child(1)").remove();
 				correct.innerHTML += '<span class="flow">The low gas production may be due to low efficiency of the reactor.</span>';
 			}
 		}
 	}else{
 		correct.innerHTML = '<span class="flow">Sufficient gas production.</span>';
 	}

}

// Sludge Waste Scheduling
function sludge_waste(){
	correct = document.getElementById('correct_sld');
	error = document.getElementById('error');
	correct.innerHTML = "";
	error.innerHTML = "";
	var flow, cod_in, cod_out, cod_rem_d, effss, s_wasting, s_yield, s_conc, sludge_production, ex_sludge;
	flow = $("#inflow_sld").val();
	cod_in_n = $("#cod_i_sld").val();
	cod_out_n = $("#cod_e_sld").val();
	effss_n = $("#effss_sld").val();
	s_conc = $("#rconc_sld").val();
	cod_in = cod_in_n / 1000;
	cod_out = cod_out_n / 1000;
	effss = effss_n / 1000;
	var rd = $('#rd input[type="radio"]:checked').val();
	if(cod_out >= (0.8 * cod_in)){
		error.innerHTML += "Reactor is not functioning.<br/>";
	}
	cod_rem_d = (cod_in - cod_out) * flow;
	if(rd == 1){
		s_yield = $("#amt_sld").val();
		if(s_yield < 0.05 || s_yield > 0.3){
			error.innerHTML += "Eneter correct sludge yield.<br/>";
		}
	}else{
		s_yield = 0.1;
	}
	if(error.innerHTML != ""){
		$('#mymodal').modal('show');
		return false;
	}
	sludge_production = s_yield * cod_rem_d;
 	s_wasting = flow * effss;
 	if(sludge_production > s_wasting){
 		ex_sludge = (sludge_production - s_wasting) / s_conc;
 		correct.innerHTML += '<span class="flow"> <b>' + (7 * ex_sludge).toFixed(3) + '</b> cum sludge should be wasted per week.</span>';
 	}else{
 		correct.innerHTML += '<span class="flow">Sludge wasting is not required.</span>';
 	}

}

// Check for toxicity
function check_toxicity(){
	reco = document.getElementById('recot');
	result = document.getElementById('result');
	error = document.getElementById('error');
	reco.innerHTML = "";
	error.innerHTML = "";
	result.innerHTML = "";
	ammo = $("#ammo").val();
	cod_in = $("#cod_i").val();
	sulphate = $("#sulphate").val();
	phenol = $("#phenol").val();
	acetate = $("#acetate").val();
	sulphides = $("#sulphides").val();
	propionate = $("#propionate").val();
	amonia = $("#amonia").val();
	var k;
	//error.innerHTML = "Enter all fields";
	if(error.innerHTML != ""){
		$('#mymodal').modal('show');
		return false;
	}
	if(ammo > 1000){
		 k =1;
		result.innerHTML += '<span class="flow">Ammonium Ions</span>';
	}
	if((cod_in / sulphate) < 10){
		k = 1;
		result.innerHTML += '<span class="flow">COD/SO4 ratio</span>';
	}
	if(phenol > 500){
		 k =1;
		result.innerHTML += '<span class="flow">Phenols</span>';
	}
	if(sulphides > 1500){
		k = 1;
		result.innerHTML += '<span class="flow">Sulphides</span>';
	}
	if(acetate > 35000){
		 k =1;
		result.innerHTML += '<span class="flow">Acetate</span>';
	}
	if(propionate > 3000){
		k = 1;
		result.innerHTML += '<span class="flow">Propionates</span>';
	}
	if(amonia > 150){
		k = 1;
		result.innerHTML += '<span class="flow">Ammonia</span>';
	}
	if(k == 1){
		recot.innerHTML += '<span class="flow">Provide dilution to reduce concentration of toxic material.</span>';
		recot.innerHTML += '<span class="flow">Provide chemical treatment for removal of toxic substances.</span>';
	}else{
		result.innerHTML = "";
		recot.innerHTML += '<span class="flow">Check for presence of other toxic materials from <b>Environmental Parameters</b> menu or from literature.</span>';
	}

}

// Check for SRT
function check_srt(){
	result = document.getElementById('result');
	error = document.getElementById('error');
	error.innerHTML = "";
	result.innerHTML = "";
	var svol, s_conc, effss, inflow, tsludge, ss_conc, rec_inf;
	var svolwaste, swasted, srt, slreq, qsl, w, maxSludgeVol, AddSludge;
	svol = ($("#s_vol").val());
	s_conc = ($("#s_conc").val()) / 1000;
	effss = ($("#eff_ss").val()) / 1000;
	inflow = ($("#r_inflow").val());
	volume = ($("#r_vol").val());
	rd = $('#rd input[type="radio"]:checked').val();
	if(s_conc <= 0){
		error.innerHTML += 'Please enter sludge concentration.<br>';
	}
	if(effss <= 0){
		error.innerHTML += 'Please enter effluent SS.<br>';
	}
	if(inflow <= 0){
		error.innerHTML += 'Please enter Inflow.<br>';
	}
	if(volume <= 0){
		error.innerHTML += 'Please enter Reactor Volume.<br>';
	}
	if(svol >= (0.8 * volume)){
		error.innerHTML += 'Enter correct Sludge Volume.<br>';
	}
	if(error.innerHTML != ""){
		$('#mymodal').modal('show');
		return false;
	}

	svol = parseFloat($("#s_vol").val());
	s_conc = parseFloat($("#s_conc").val()) / 1000;
	effss = parseFloat($("#eff_ss").val()) / 1000;
	inflow = parseFloat($("#r_inflow").val());
	volume = parseFloat($("#r_vol").val());

	tsludge = svol * s_conc;
 	sweff = inflow * effss;
 	swasted = 0;
 	if(rd == 1){
 		w = 1;
 		svolwaste = parseFloat($("#s_waste").val());
 		swasted = svolwaste * s_conc;
 	}
 	srt = tsludge / (sweff + swasted);
 	if(srt < 50){
 		result.innerHTML += '<span class="flow">Insufficient Sludge Retention Time.</span>';
 		if(w == 1){
 			w = 2;
 			result.innerHTML += '<span class="flow">Stop artificial wasting from sludge bed.</span>';
 		}
 		result.innerHTML += '<span class="flow">Check gas leakages in G.S.S. or reduce upflow velocity.</span>';
 		if(srt < 40){
 			slreq = 60 * (sweff);
 			qsl = slreq - (svol * s_conc);
 			if( ((qsl / s_conc) + svol) > (0.6 * volume) ){
 				maxSludgeVol = 0.6 * volume;
        AddSludge = maxSludgeVol - svol;
        if(AddSludge <= 0){
        	rec_inf = (svol * s_conc) / (50 * effss);
        	result.innerHTML += '<span class="flow">LK_Restrict flow rate to maximum ' + rec_inf.toFixed(3) + ' cum/d until Sludge Volume becomes ' + (0.5 * volume) + ' cum.</span>';
        }else{
        	if(w != 2){
        		result.innerHTML += '<span class="flow">Add ' + (AddSludge * s_conc).toFixed(3) + ' Kg of sludge in the reactor.</span>';
        	}
        	rec_inf = ((AddSludge + svol) * s_conc) / (50 * effss);
        	if(rec_inf > inflow){
        		rec_inf = inflow;
        	}else{
        		result.innerHTML += '<span class="flow">Restrict flow rate to maximum ' + rec_inf.toFixed(3) + ' cum/d until Sludge Volume becomes ' + (0.5 * volume) + ' cum.</span>';
        	}
        }
 			}else{

 			}
 		}
 	}else{
 		result.innerHTML = '<span class="flow">Sludge Retention Time is sufficient.</span>';
 	}
}

function own_savePDF() {  
  var doc = new jsPDF();
  doc.setProperties({
      title: 'Reactor Design',     
      author: 'Pankaj Sarkar'
  });

  doc.setFontSize(12);
  doc.setFontType("bold");
  doc.text(10, 10, 'Upflow Anaerobic Sludge Blanket Reactor Design');

  doc.setFontSize(10);

  doc.setFontType("bold");
  doc.text(10, 20, 'Input Values');
  doc.setFontType("normal");
  doc.text(15, 25, 'Inflow: ' + document.getElementById("inflow").value + ' cum/d');  
  doc.text(15, 30, 'COD: ' + document.getElementById("cod").value + ' mg/L');
  doc.text(15, 35, 'OLR: ' + document.getElementById("olr").value + ' KgCOD/cum.d');

  doc.setFontType("bold");
  doc.text(10, 45, 'Output Values');
  doc.setFontType("normal");  
  doc.text(15, 50, 'Total Volume: ' + document.getElementById("vol").value + ' cum');  
  doc.text(15, 55, 'Total Area: ' + document.getElementById("area").value + ' sqm');
  doc.text(15, 60, 'HRT: ' + document.getElementById("hrt").value + ' h');
  doc.text(15, 65, 'OLR: ' + document.getElementById("olr1").value + ' KgCOD/cum.d');
  doc.text(15, 70, 'SLR: ' + document.getElementById("slr").value + ' KgCOD/KgVSS.d');
  doc.text(15, 75, 'Upflow Velocity: ' + document.getElementById("upv").value + ' m/h');

  doc.setFontType("bold");
  doc.text(10, 85, 'Reactor Dimensions');
  doc.setFontType("normal");
  doc.text(15, 90, 'Number of Units: ' +  document.getElementById("nou").value);
  if(shape == 1){
    doc.text(15, 95, 'Height: ' + document.getElementById("height").value + ' m + Free board 0.5 m');
    doc.text(15, 100, 'Length: ' + document.getElementById("length").value + ' m');
    doc.text(15, 105, 'Width: ' + document.getElementById("width").value + ' m');
  }else{
    doc.text(15, 95, 'Height: ' + document.getElementById("height").value + ' m + Free board 0.5 m');
    doc.text(15, 100, 'Diameter: ' + document.getElementById("dia").value + ' m');
  }
  doc.text(15, 110, 'Inlet Numbers per Unit: ' + document.getElementById("inlet").value);
  if(strnote == 1){
  	splitTitle = doc.splitTextToSize(document.getElementById("strFilter").innerHTML, 180);
		doc.text(15, 115, splitTitle);
  	//doc.text(15, 115, document.getElementById("strFilter").innerHTML);
  }
  doc.output('dataurlnewwindow');
}