//Lower Efficiency
function lower_efficiency(){
	result = document.getElementById('result_eff');
	correct = document.getElementById('correct_eff');
	error = document.getElementById('error_eff');
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
		$('#mymodal_eff').modal('show');
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
	error = document.getElementById('error_ss');
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
		$('#mymodal_ss').modal('show');
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
	error = document.getElementById('error_gas');
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
		$('#mymodal_gas').modal('show');
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
	error = document.getElementById('error_sld');
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
		$('#mymodal_sld').modal('show');
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
	svol = parseFloat($("#s_vol").val());
	s_conc = parseFloat($("#s_conc").val()) / 1000;
	effss = parseFloat($("#eff_ss").val()) / 1000;
	inflow = parseFloat($("#r_inflow").val());
	volume = parseFloat($("#r_vol").val());
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
	tsludge = svol * s_conc;
 	sweff = inflow * effss;
 	swasted = 0;
 	if(rd == 1){
 		w = 1;
 		svolwaste = $("#s_waste").val();
 		swasted = svolwaste * s_conc;
 	}
 	srt = tsludge / (sweff + swasted);
 	if(srt < 50){
 		result.innerHTML += '<span class="flow">Insufficient Sludge Retention Time.</span>';
 		if(w == 1){
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
        	result.innerHTML += '<span class="flow">LK_Restrict flow rate to maximum ' + rec_inf.toFixed(2) + ' cum/d until Sludge Volume becomes ' + (0.5 * volume) + ' cum.</span>';
        }else{
        	result.innerHTML += '<span class="flow">Add ' + (AddSludge * s_conc).toFixed(3) + ' Kg of sludge in the reactor.</span>';
        	rec_inf = ((AddSludge + svol) * s_conc) / (50 * effss);
        	if(rec_inf > inflow){
        		rec_inf = inflow;
        	}else{
        		result.innerHTML += '<span class="flow">Restrict flow rate to maximum ' + rec_inf.toFixed(2) + ' cum/d until Sludge Volume becomes ' + (0.5 * volume) + ' cum.</span>';
        	}
        }
 			}else{

 			}
 		}
 	}else{
 		result.innerHTML = '<span class="flow">Sludge Retention Time is sufficient.</span>';
 	}
}

//Low COD Design
function lowcod_reactor(){
	error = document.getElementById('error');
	error.innerHTML = "";
	inflow = parseFloat($("#inflow").val());
	cod = parseFloat($("#cod").val()) / 1000;
	temp = parseFloat($("#temp").val());
	shape = $("input[name=shape]:checked").val();
	if(inflow <= 2){
		error.innerHTML += "UASB reactor treatment is not advisable.<br/>";
	}
	if( (cod * 1000) > 750){
		error.innerHTML += "Select appropriate choice for COD>750<br/>";
	}
	if(cod <= 0){
		error.innerHTML += "Please eneter correct value of COD.<br/>";
	}
	if(temp < 15){
		error.innerHTML += "The UASB reactor can not perform well at this temperature.<br/>";
	}
	if(temp <= 10){
		error.innerHTML += "Treatment by UASB reactor is not feasible due to low temperature.<br/>";
	}
	if(temp > 65){
		error.innerHTML += "The treatment is not possible due to very high temperature.<br/>";
	}
	if(error.innerHTML != ""){
		$('#mymodal').modal('show');
		return false;
	}
	olr_l = 1.5;
  olr_h = 3;
  m = 1;
  if(temp > 40){
  	olr_h = 1.25 * olr_h;
    m = 1.25;
  }else{
  	p_temp();
  }
  if(olr_l < 0.7){
  	olr_l = 0.7;
  }
  if(olr_h < 0.7){
  	olr_h = 0.7;
  }
  if(olr_l > 3 * m){
  	olr_l = 3 * m;
  }
  if(olr_h > 3 * m){
  	olr_h = 3 * m;
  }
  olr = olr_h;

  r_vol = (inflow * cod) / olr;
 	vss = (inflow * cod) / slr;
	s_vol = vss / 25;
	if( s_vol < (0.3 * r_vol) ){
		p_hrt(18, 6);
		if(h == hrt){
			p_print();
		}else{
			r_vol = hrt * (inflow / 24);
      olr = (inflow * cod) / r_vol;
      p_mainolr();
      if(slr > 0.3){
      	s = 0.3;
        vss1 = (inflow * cod) / s;
        s_v = vss1 / 25;
        if(s_v < (0.3 * r_vol)){
        	slr = s;
        }
      }
      p_print();
		}
		height1 = 6;
		do{
			upv = height1 / hrt;
			if(upv >= 0.25 && upv <= 0.7){
				break;
			}else{
				height1 = height1 - 0.25;
			}
		}while(height1 >= 4.5);
		if(upv < 0.25 || upv > 0.7){
			height1 = 4.5;
      upv = height1 / hrt;
		}
	}else{
		p_mainolr();
		if(h != hrt){
			r_vol = hrt * (inflow / 24);
      olr = (inflow * cod) / r_vol;
      p_mainolr();
      if(slr > 0.3){
      	s = 0.3;
        vss1 = (inflow * cod) / s;
        s_v = vss1 / 25;
        if( s_v < (0.3 * r_vol) ){
        	slr = s;
        }
      }
		}
		height1 = 6;
		do{
			upv = height1 / hrt;
			if(upv >= 0.25 && upv <= 0.7){
				break;
			}else{
				height1 = height1 - 0.25;
			}
		}while(height1 >= 4.5);
		if(upv < 0.25 || upv > 0.7){
			height1 = 4.5;
      upv = height1 / hrt;
		}
	}
	vol1 = r_vol;
 	area1 = r_vol / height1;
 	nou = no1;
 	width11 = width1;
 	height_o = height1;
 	p_methane();
 	document.getElementById('efficiency').value = eff_min + "--" + eff_max;
 	document.getElementById('meth_prod').value = cum_methane.toFixed(3);
 	document.getElementById('power').value = power.toFixed(3);
 	p_print;
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
	p_gssd();
 	p_inletnos();
 	document.getElementById('nolat').value = nolat;
 	document.getElementById('main_dia').value = lat_d_in.toFixed(2);
 	document.getElementById('lat_dia').value = main_d_in.toFixed(2);

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

	function p_subslr(){
		do{
			vss = (inflow * cod) / slr;
	    s_vol = vss / 25;
	    if(s_vol < (0.3 * r_vol)){
	    	break;
	    }else{
	      slr = slr + 0.05;
	    }
		}while(slr < 0.3);
	}

	function p_slr(){
		if( slr >= 0.1 && slr <= 0.3 ){
			p_subslr();
		}else{
			if(slr < 0.1){
				slr = 0.1;
      	p_subslr();
     }else{
     	if(slr > 0.3){
     		slr = 0.3;
        p_subslr();
     	}
     }
		}
	}

	function p_olr(){
		do{
			r_vol = (inflow * cod) / olr;
  		p_slr();
  		if(s_vol < (0.3 * r_vol)){
  			break;
  		}else{
  			olr = olr - 0.1;
   			slr = 0.1;
  		}
		}while(olr >= 0.5);
		p_hrt(18, 6);
	}

	function p_mainolr(){
		if(olr >= olr_l && olr <= olr_h){
			p_olr();
		}else{
			if(olr < olr_l){
				olr = olr_l;
    		p_olr();
    		hrt = r_vol / (inflow / 24);
    		height1 = 6;
    		do{
    			upv = height1 / hrt;
    			if(upv >= 0.25 && upv <= 0.7){
    				break;
    			}else{
    				height1 = height1 - 0.25;
    			}
    		}while(height1 >= 4.5);
			}else{
				if(olr > olr_h){
					olr = olr_h;
      		p_olr();
      		hrt = r_vol / (inflow / 24);
      		height1 = 6;
      		do{
      			upv = height1 / hrt;
      			if(upv >= 0.25 && upv <= 0.7){
      				break;
      			}else{
      				height1 = height1 - 0.25;
      			}
      		}while(height1 >= 4.5);
				}
			}
		}
	}

	function p_temp(){
		if(temp == 0){
			temp = 30;
		}
		if(temp != 30){
			y = 0.7214 * temp - 10.548
		  y30 = 0.7214 * 30 - 10.548
		  ratio = y / y30
		  i_olr = ratio * olr_l
		  f_olr = ratio * olr_h
		  olr_l = i_olr
		  olr_h = f_olr
		}
	}

	function p_methane(){
		var t_cod, cod_removed, methane_pro, tempc, methane_col;
		var tempk, energy, t_energy, x4, startup, eff, s1, cod_r_eff;
		tempc = temp;
		tempk = tempc + 273
		t_cod = inflow * cod
		if(cod <= 0.75){
			cod_removed = t_cod * 0.7;
		}else{
			cod_removed = t_cod * 0.8;
		}
		methane_pro = (cod_removed / 4);
		methane_col = (2 / 3) * methane_pro;
		energy = methane_col * 50.4;
		t_energy = energy / (24 * 3.6);
		power = t_energy * 0.3;
		cum_methane = (1.28 * tempk * cod_removed) / 1000;
		t_gas11 = cum_methane / 0.7;
		if(cod <= 1){
			eff_min = 70;
 			eff_max = 75;
		}
		if(cod > 1 && cod <= 3){
			eff = 96.18 + 35.8 * upv + 0.2175 * hrt - 0.01128 * (1000 * cod) - 0.0118 * 100 - 2.95 * upv * hrt + 0.01123 * upv * (1000 * cod) + 0.0014 * hrt * (cod * 1000) - 0.00000486 * (cod * 1000) ^ 2;
			startup = 18.98 + 200 * upv + 0.5 * hrt - 0.0238 * (cod * 1000) + 0.06 * 100 - 10 * upv * hrt - 0.06 * upv * (cod * 1000) + 0.00001033 * (cod * 1000) ^ 2;
			eff_max = Math.round(eff) + 4.5;
			eff_min = Math.round(eff) - 4.5;
			if(eff_max > 99){
				eff_max = 95;
  			eff_min = 90;
			}
		}
		if(cod > 3){
			eff_min = 80;
			eff_max = 85;
		}
		if(olr > 15){
 			eff_min = 75;
 			eff_max = 80;
		}
 		s1 = Math.round(startup);
	}

	function p_hrt(mhrt, mht){
		hrt = r_vol / (inflow / 24);
		h = hrt;
		if(hrt >= 6 && hrt <= mhrt){
			p_height(mhrt, mht);
		}else{
			if( hrt < 6){
				 hrt = 6;
				 p_height(mhrt, mht);
			}else{
				if(hrt > mhrt){
					hrt = mhrt;
        	p_height(mhrt, mht);
				}
			}
		}
	}

	function p_height(maxhrt, ht){
		do{
			height1 = ht;
			do{
				upv = height1 / hrt;
				if( upv >= 0.25 && upv <= 0.7){
					break;
				}else{
					height1 = height1 - 0.25;
				}
			}while(height1 >= 4.5);
			if(upv >= 0.25 && upv <= 0.7){
				break;
			}else{
				hrt = hrt + 0.5;
			}
		}while(hrt <= maxhrt);
	}

	function p_areas(){
		area = r_vol / height1;
		if(area > 100){
			width1 = parseFloat(prompt("Enter width of the reactor.Note that it should not be grater than 10m"));
			if(width1 == 0){
				width1 = 5;
			}
			length1 = area / width1;
 			int1 = Math.round(length1 / width1);
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

	function p_inletnos(){
		var den, c_len = [], inflow1, note;
		note = 0;
		length = length1;
		diameter = f_dia;
		den = 86400;
		inflow1 = (inflow / no1) / den;
		f = 0.03;
		if( olr <= 3){
			dist = 1.414;
		}else{
			dist = 1.75;
		}
		h_f = 0.02 * (height1 + 4);
		if(shape == 1){
			nolat = width1 / dist;
			if( (nolat - Math.round(width1 / dist)) > 0.5 ){
				nolat = Math.round(nolat) + 1;
			}else{
				nolat = Math.round(nolat);
			}
			main_d = ((3.242 * f * (width1 + 10) * Math.pow(inflow1, 2)) / (h_f * 9.81)) ^ (1 / 5);
      main_d_in = 39.37 * main_d;
      if( (main_d_in - Math.round(main_d_in)) > 0.05 ){
      	main_d_in = Math.round(main_d_in) + 1;
      }else{
      	main_d_in = Math.round(main_d_in);
      }
      if(nolat <= 0){
      	nolat = 1;
        lat_d_in = main_d_in;
      }
      if(nolat > 4){
				note1 = 1;
				nolat1 = Math.round(nolat / 3) + 1;
				p = 2;
				dist_lat = width1 / (nolat1 + 1);
				sublat_length = (dist_lat / 2);
				dist_sublat = dist_lat / 2;
				lat_inf = inflow1 / nolat1;
				lat_d = ((3.242 * f * (length + 1) * Math.pow(lat_inf, 2)) / (h_f * 9.81)) ^ (1 / 5);
				lat_d_in = 39.37 * lat_d;
				if( (lat_d_in - Math.round(lat_d_in)) > 0.05 ){
					if(lat_d_in < 1.5){
						lat_d_in = 1.5;
					}else{
						lat_d_in = Math.round(lat_d_in) + 1;
					}
				}else{
					lat_d_in = Math.round(lat_d_in);
				}
				sublat_d = ((lat_d ^ 5) / (8 * f * length)) ^ (1 / 4);
        sublat_d_in = 39.37 * sublat_d;
        if( (sublat_d_in - Math.round(sublat_d_in)) > 0.05 ){
        	if(sublat_d_in < 1.5){
        		sublat_d_in = 1.5;
        	}else{
        		sublat_d_in = Math.round(sublat_d_in) + 1;
        	}
        }else{
        	sublat_d_in = Math.round(sublat_d_in);
        }
        //capt = "Provide" & Format(sublat_length, "#0.000") & " m long sub laterals on each lateral with equal length on both side of lateral, at " & Format(dist_sublat, "#0.000") & "m C/C."
        nolat = nolat1;
      }else{
				dist_lat = width1 / (nolat + 1);
				lat_inf = inflow1 / nolat;
				lat_d = ((3.242 * f * (length + 1) * (lat_inf ^ 2)) / (h_f * 9.81)) ^ (1 / 5);
				lat_d_in = 39.37 * lat_d;
				if(lat_d_in < 1){
					lat_d_in = 1;
				}else{
					if( (lat_d_in - Math.round(lat_d_in)) > 0.05 ){
						if(lat_d_in < 1.5){
							lat_d_in = 1.5;
						}else{
							lat_d_in = Math.round(lat_d_in) + 1
						}
					}else{
						lat_d_in = Math.round(lat_d_in);
					}
				}
				noze_d = Math.pow((Math.pow(lat_d, 5) / (8 * f * length)), (1 / 4));
        noze_d_in = 39.37 * noze_d;
        if(noze_d_in < 0.5){
        	noze_d_in = 0.5;
        }else{
        	if((noze_d_in - Math.round(noze_d_in)) > 0.05){
        		if( noze_d_in < 1.5){
        			 noze_d_in = 1.5;
        		}else{
        			noze_d_in = Math.round(noze_d_in) + 1;
        		}
        	}else{
        		noze_d_in = Math.round(noze_d_in);
        	}
        }
        nonoze = (length / dist);
        if(nonoze <= 0){
        	nonoze = 1;
        }
        if( (nonoze - Math.round(length / dist)) > 0.5 ){
        	nonoze = Math.round(nonoze) + 1;
        }else{
        	nonoze = Math.round(nonoze);
        }
        if(length < 1){
        	nonoze = 1
        }else{
        	if(length < 3){
        		nonoze = 2;
        	}
        }
        dist_noze = length / (nonoze + 1);
        note1 = 0;
      }
		}else{
			main_d = (((3.242 * (f * ((diameter + 10) * Math.pow(inflow1, 2)))) / Math.pow(h_f * 9.81)), (1 / 5));
			main_d_in = (39.37 * main_d);
			if (((main_d_in - Math.round(main_d_in)) > 0.05)) {
			  main_d_in = (Math.round(main_d_in) + 1);
			} else {
			  main_d_in = Math.round(main_d_in);
			}
			nolat = (diameter / dist);
			if (((nolat - Math.round((diameter / dist))) > 0.5)) {
			  nolat = (Math.round(nolat) + 1);
			} else {
			  nolat = Math.round(nolat);
			}

			p = 1;
			if ((nolat <= 0)) {
			  nolat = 1;
			  lat_d_in = main_d_in;
			}

			if ((nolat > 4)) {
			  note1 = 1;
			  nolat1 = (Math.round((nolat / 3)) + 1);
			  p = 2;
			  dist_lat = (diameter / (nolat1 + 1));
			  sublat_length = (dist_lat / 2);
			  dist_sublat = (dist_lat / 2);
			  lat_inf = (inflow1 / nolat1);
			  lat_d = Math.pow(((3.242 * (f * ((diameter + 1) * Math.pow(lat_inf, 2)))) / (h_f * 9.81)), (1 / 5));
			  lat_d_in = (39.37 * lat_d);
			  if (((lat_d_in - Math.round(lat_d_in)) > 0.05)) {
			    if ((lat_d_in < 1.5)) {
			      lat_d_in = 1.5;
			    } else {
			      lat_d_in = (Math.round(lat_d_in) + 1);
			    }

			  } else {
			    lat_d_in = Math.round(lat_d_in);
			  }

			  sublat_d = Math.pow((Math.pow(lat_d, 5) / (8 * (f * diameter))), (1 / 4));
			  sublat_d_in = (39.37 * sublat_d);
			  if (((sublat_d_in - Math.round(sublat_d_in)) > 0.05)) {
			    if ((sublat_d_in < 1.5)) {
			      sublat_d_in = 1.5;
			    } else {
			      sublat_d_in = (Math.round(sublat_d_in) + 1);
			    }
			  } else {
			    sublat_d_in = Math.round(sublat_d_in);
			  }

			  //capt = ("Provide" + (Format(sublat_length, "#0.000") + (" m long sub laterals on each lateral with equal length on both side of lateral, at " + (Format(dist_sublat, "#0.000") + "m. C/C."))));
			  nolat = nolat1;
			} else {
			  dist_lat = (diameter / (nolat + 1));
			  R = (diameter.toFixed(2)) / 2;
			  rim = (nolat % 2);
			  if ((rim == 0)) {
			    f1 = (nolat / 2);
			  } else {
			    f1 = (Math.round((nolat / 2)) + 1);
			    o = 1;
			  }

			  for (i = 0, i <= (f1 - 1), i++) {
			    ab = ((dist_lat * i) + (dist_lat / 2));
			    ratio = ((R - ab) / R);
			    arccos = (Math.atan(((ratio / Math.sqrt((((ratio * ratio) * -1) + 1))) * -1)) + (2 * Math.atan(1)));
			    angle11 = arccos;
			    c_len(i) = (2 *(R * Math.sin(angle11)));
			    nonoze_t = (nonoze_t + (2 * (c_len(i) / dist)));
			    if (((i ==(f1 - 1)) && (o == 1))) {
			      nonoze_t = (nonoze_t -(c_len(i) / dist));
			    }
			  }

			  // ***********Arc length calculations complete
			  Max = c_len(0);
			  for (i = 1, i <=(f1 - 1), i++) {
			    if ((Max < c_len(i))) {
			      Max = c_len(i);
			    }
			  }

			  nonoze = (Max / dist);
			  if (((nonoze - Math.round((Max / dist))) >  0.5)) {
			    nonoze = (Math.round(nonoze) + 1);
			  } else {
			    nonoze = Math.round(nonoze);
			  }

			  if ((Max < 1)) {
			    nonoze = 1;
			  } else if ((Max < 3)) {
			    nonoze = 2;
			  }

			  dist_noze = (Max /  (nonoze + 1));
			  note1 = 0;
			  if ((nonoze <= 0)) {
			    nonoze = 1;
			  }

			  lat_inf = (inflow1 / nolat);
			  lat_d = Math.pow(((3.242 * (f * ((diameter + 1) * Math,pow(lat_inf, 2)))) / (h_f * 9.81)), (1 / 5));
			  lat_d_in = (39.37 * lat_d);
			  if ((lat_d_in < 1)) {
			    lat_d_in = 1;
			  } else if (((lat_d_in - Math.round(lat_d_in)) > 0.05)) {
			    if ((lat_d_in < 1.5)) {
			      lat_d_in = 1.5;
			    } else {
			      lat_d_in = (Math.round(lat_d_in) + 1);
			    }

			  } else {
			    lat_d_in = Math.round(lat_d_in);
			  }

			  noze_d = Math.pow((Math.pow(lat_d, 5) / (8 * (f * diameter))), (1 / 4));
			  noze_d_in = (39.37 * noze_d);
			  if ((noze_d_in < 0.5)) {
			    noze_d_in = 0.5;
			  } else if (((noze_d_in - Math.round(noze_d_in)) > 0.05)) {
			    if ((noze_d_in < 1)) {
			      noze_d_in = 1;
			    } else {
			      noze_d_in = (Math.round(noze_d_in) + 1);
			    }
			  } else {
			    noze_d_in = Math.round(noze_d_in);
			  }
			}
		}
	}
	// Inside Function End

}