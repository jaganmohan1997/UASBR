var inflow , cod, temp, y, y30, ratio , olr_l, olr_h, i_olr, f_olr, olr , vss1 , slr , s , hrt , h , upv , area , r_vol , height1 , width1 , length1 , dia , s_vol , s_v , vss , f_vol , no1, mina, f_dia , tempa;
var inletno, dif, vol1, area1, height_o, dia1, width11 , a, angle_o, angle1, angle, atan_o, atan , x, t_gas, G, open_a, vel, l_h, l_b;
var h1, g_height, g_width, g_width_o, inc_len, g_tlen, len1 , w_bot, w_bot1, w_t, w_tc, den, inf, pl_area , flow_cone, gas_cone, int_a, g_l, gas_loading , w_a, w_ac, a_ap, w_s, sur_overf , ml_w, ml_h, w_tlimit, w_b , DeflectorHeight;
var power, cum_methane, t_gas11, eff_max, eff_min, nonoze_t, o, Opt1;

// MOdule Functions
function p_areac(frm) {
  var areamax;
  if((frm.trim() == "frmveryhi")) {
    areamax = 300;
  } else {
    areamax = 175;
  }
  pi = (22 / 7);
  area = (r_vol / height1);
  if((area > areamax)) {
    nou = (area / 175);
    if((nou < 1.2)) {
      nou = 1;
      f_dia = Math.sqrt(((4 * area) / pi));
    } else {
      nou = (Math.floor(nou) + 1);
      tempa = (area / nou);
      f_dia = Math.sqrt(((4 * tempa) / pi));
    }
  } else {
    nou = 1;
    f_dia = Math.sqrt(((4 * area) / pi));
  }
  no1 = nou;
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
		eff = 96.18 + 35.8 * upv + 0.2175 * hrt - 0.01128 * (1000 * cod) - 0.0118 * 100 - 2.95 * upv * hrt + 0.01123 * upv * (1000 * cod) + 0.0014 * hrt * (cod * 1000) - 0.00000486 * Math.pow((cod * 1000), 2);
		startup = 18.98 + 200 * upv + 0.5 * hrt - 0.0238 * (cod * 1000) + 0.06 * 100 - 10 * upv * hrt - 0.06 * upv * (cod * 1000) + 0.00001033 * Math.pow((cod * 1000), 2);
		eff_max = Math.floor(eff) + 4.5;
		eff_min = Math.floor(eff) - 4.5;
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
		s1 = Math.floor(startup);
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
		if( (nolat - Math.floor(width1 / dist)) > 0.5 ){
			nolat = Math.floor(nolat) + 1;
		}else{
			nolat = Math.floor(nolat);
		}
		main_d = Math.pow(((3.242 * f * (width1 + 10) * Math.pow(inflow1, 2)) / (h_f * 9.81)), (1 / 5));
    main_d_in = 39.37 * main_d;
    if( (main_d_in - Math.floor(main_d_in)) > 0.05 ){
    	main_d_in = Math.floor(main_d_in) + 1;
    }else{
    	main_d_in = Math.floor(main_d_in);
    }
    if(nolat <= 0){
    	nolat = 1;
      lat_d_in = main_d_in;
    }
    if(nolat > 4){
			note1 = 1;
			nolat1 = Math.floor(nolat / 3) + 1;
			p = 2;
			dist_lat = width1 / (nolat1 + 1);
			sublat_length = (dist_lat / 2);
			dist_sublat = dist_lat / 2;
			lat_inf = inflow1 / nolat1;
			lat_d = Math.pow(((3.242 * f * (length + 1) * Math.pow(lat_inf, 2)) / (h_f * 9.81)), (1 / 5));
			lat_d_in = 39.37 * lat_d;
			if( (lat_d_in - Math.floor(lat_d_in)) > 0.05 ){
				if(lat_d_in < 1.5){
					lat_d_in = 1.5;
				}else{
					lat_d_in = Math.floor(lat_d_in) + 1;
				}
			}else{
				lat_d_in = Math.floor(lat_d_in);
			}
			sublat_d = Math.pow((Math.pow(lat_d, 5) / (8 * f * length)), (1 / 4));
      sublat_d_in = 39.37 * sublat_d;
      if( (sublat_d_in - Math.floor(sublat_d_in)) > 0.05 ){
      	if(sublat_d_in < 1.5){
      		sublat_d_in = 1.5;
      	}else{
      		sublat_d_in = Math.floor(sublat_d_in) + 1;
      	}
      }else{
      	sublat_d_in = Math.floor(sublat_d_in);
      }
      capt = "Provide " + sublat_length.toFixed(3) + " m long sub laterals on each lateral with equal length on both side of lateral, at " + dist_sublat.toFixed(3) + "m C/C."
      nolat = nolat1;
    }else{
			dist_lat = width1 / (nolat + 1);
			lat_inf = inflow1 / nolat;
			lat_d = Math.pow(((3.242 * f * (length + 1) * Math.pow(lat_inf, 2)) / (h_f * 9.81)), (1 / 5));
			lat_d_in = 39.37 * lat_d;
			if(lat_d_in < 1){
				lat_d_in = 1;
			}else{
				if( (lat_d_in - Math.floor(lat_d_in)) > 0.05 ){
					if(lat_d_in < 1.5){
						lat_d_in = 1.5;
					}else{
						lat_d_in = Math.floor(lat_d_in) + 1
					}
				}else{
					lat_d_in = Math.floor(lat_d_in);
				}
			}
			noze_d = Math.pow((Math.pow(lat_d, 5) / (8 * f * length)), (1 / 4));
      noze_d_in = 39.37 * noze_d;
      if(noze_d_in < 0.5){
      	noze_d_in = 0.5;
      }else{
      	if((noze_d_in - Math.floor(noze_d_in)) > 0.05){
      		if( noze_d_in < 1.5){
      			 noze_d_in = 1.5;
      		}else{
      			noze_d_in = Math.floor(noze_d_in) + 1;
      		}
      	}else{
      		noze_d_in = Math.floor(noze_d_in);
      	}
      }
      nonoze = (length / dist);
      if(nonoze <= 0){
      	nonoze = 1;
      }
      if( (nonoze - Math.floor(length / dist)) > 0.5 ){
      	nonoze = Math.floor(nonoze) + 1;
      }else{
      	nonoze = Math.floor(nonoze);
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
		main_d = Math.pow(((3.242 * (f * ((diameter + 10) * Math.pow(inflow1, 2)))) / (h_f * 9.81)), (1 / 5));
		main_d_in = (39.37 * main_d);
		if (((main_d_in - Math.floor(main_d_in)) > 0.05)) {
		  main_d_in = (Math.floor(main_d_in) + 1);
		} else {
		  main_d_in = Math.floor(main_d_in);
		}
		nolat = (diameter / dist);
		if (((nolat - Math.floor((diameter / dist))) > 0.5)) {
		  nolat = (Math.floor(nolat) + 1);
		} else {
		  nolat = Math.floor(nolat);
		}
		p = 1;
		if ((nolat <= 0)) {
		  nolat = 1;
		  lat_d_in = main_d_in;
		}

		if ((nolat > 4)) {
		  note1 = 1;
		  nolat1 = (Math.floor((nolat / 3)) + 1);
		  p = 2;
		  dist_lat = (diameter / (nolat1 + 1));
		  sublat_length = (dist_lat / 2);
		  dist_sublat = (dist_lat / 2);
		  lat_inf = (inflow1 / nolat1);
		  lat_d = Math.pow(((3.242 * (f * ((diameter + 1) * Math.pow(lat_inf, 2)))) / (h_f * 9.81)), (1 / 5));
		  lat_d_in = (39.37 * lat_d);
		  if (((lat_d_in - Math.floor(lat_d_in)) > 0.05)) {
		    if ((lat_d_in < 1.5)) {
		      lat_d_in = 1.5;
		    } else {
		      lat_d_in = (Math.floor(lat_d_in) + 1);
		    }

		  } else {
		    lat_d_in = Math.floor(lat_d_in);
		  }

		  sublat_d = Math.pow((Math.pow(lat_d, 5) / (8 * (f * diameter))), (1 / 4));
		  sublat_d_in = (39.37 * sublat_d);
		  if (((sublat_d_in - Math.floor(sublat_d_in)) > 0.05)) {
		    if ((sublat_d_in < 1.5)) {
		      sublat_d_in = 1.5;
		    } else {
		      sublat_d_in = (Math.floor(sublat_d_in) + 1);
		    }
		  } else {
		    sublat_d_in = Math.floor(sublat_d_in);
		  }

		  capt = "Provide " + sublat_length.toFixed(3) + " m long sub laterals on each lateral with equal length on both side of lateral, at " + dist_sublat.toFixed(3) + "m C/C."
		  nolat = nolat1;
		} else {
		  dist_lat = (diameter / (nolat + 1));
		  R = (diameter.toFixed(2)) / 2;
		  rim = (nolat % 2);
		  if ((rim == 0)) {
		    f1 = (nolat / 2);
		  } else {
		    f1 = (Math.floor((nolat / 2)) + 1);
		    o = 1;
		  }

		  for (i = 0; i <= (f1 - 1); i++) {
		    ab = ((dist_lat * i) + (dist_lat / 2));
		    ratio = ((R - ab) / R);
		    arccos = Math.atan(-ratio / Math.sqrt(-ratio * ratio + 1)) + 2 * Math.atan(1);
		    angle11 = arccos;
		    c_len[i] = (2 *(R * Math.sin(angle11)));
		    nonoze_t = (nonoze_t + (2 * (c_len[i] / dist)));
		    if (((i ==(f1 - 1)) && (o == 1))) {
		      nonoze_t = (nonoze_t -(c_len[i] / dist));
		    }
		  }

		  // ***********Arc length calculations complete
		  Max = c_len[0];
		  for (i = 1; i <= (f1 - 1); i++) {
		    if ((Max < c_len[i])) {
		      Max = c_len[i];
		    }
		  }

		  nonoze = (Max / dist);
		  if (((nonoze - Math.floor((Max / dist))) >  0.5)) {
		    nonoze = (Math.floor(nonoze) + 1);
		  } else {
		    nonoze = Math.floor(nonoze);
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
		  lat_d = Math.pow(((3.242 * (f * ((diameter + 1) * Math.pow(lat_inf, 2)))) / (h_f * 9.81)), (1 / 5));
		  lat_d_in = (39.37 * lat_d);
		  if ((lat_d_in < 1)) {
		    lat_d_in = 1;
		  } else if (((lat_d_in - Math.floor(lat_d_in)) > 0.05)) {
		    if ((lat_d_in < 1.5)) {
		      lat_d_in = 1.5;
		    } else {
		      lat_d_in = (Math.floor(lat_d_in) + 1);
		    }

		  } else {
		    lat_d_in = Math.floor(lat_d_in);
		  }

		  noze_d = Math.pow((Math.pow(lat_d, 5) / (8 * (f * diameter))), (1 / 4));
		  noze_d_in = (39.37 * noze_d);
		  if ((noze_d_in < 0.5)) {
		    noze_d_in = 0.5;
		  } else if (((noze_d_in - Math.floor(noze_d_in)) > 0.05)) {
		    if ((noze_d_in < 1)) {
		      noze_d_in = 1;
		    } else {
		      noze_d_in = (Math.floor(noze_d_in) + 1);
		    }
		  } else {
		    noze_d_in = Math.floor(noze_d_in);
		  }
		}
	}
}

function p_nocone() {
  pi = (22 / 7);
  a = ((angle * pi) / 180);
  delta_h = ((w_t / 2) * Math.tan(a));
  w_bot = ((2 * ((g_height + delta_h) / Math.tan(angle))) + w_a);
  no = Math.floor((g_l / w_bot));
  dif = ((g_l / w_bot) - no);
  if ((dif > 0.5)) {
    nocone_o = (no + 1);
  } else {
    nocone_o = no;
  }

  w_bot_o = (g_l / nocone_o);
  atan_o = ((180 / (22 / 7)) * Math.atan((g_height / (w_bot_o / 2))));
  nocone = nocone_o;
  hight_o = height1;
  nocone_c = nocone_o;
  w_bot = w_bot_o;
  layer = 1;
}

function p_flows(){
	inf = inflow / no1;
  pl_area = (area / no1);
  flow_cone = (inf * w_bot * g_tlen) / (pl_area * layer);
  if(shape == 1){
  	gas_cone = (t_gas) / (nocone_c * layer);
  }else{
  	gas_cone = ((t_gas) * w_bot * g_tlen) / (pl_area * layer);
  }
}

function p_appwidth() {
 a_ap = ((flow_cone / 24) / 3.5);
 w_ac = (a_ap / g_tlen);
 if ((w_ac < 0.2)) {
   w_ac = 0.2;
 } else if ((w_ac > 0.5)) {
   w_ac = 0.5;
   nocone_c = (nocone_c + 1);
   w_bot = (g_l / nocone_c);
   nocone = nocone_c;
   p_flows();
   p_appwidth();
 } else {
   w_a = w_ac;
 }
 w_a = w_ac;
}

function p_wtlimit() {
  if ((cod <= 0.75)) {
    w_tlimit = 0.5;
    p_gasl();
    p_suroverflow();
  } else {
    s_area = (flow_cone / 10);
    w_s = (s_area / g_tlen);
    w_tlimit = (w_bot - w_s);
    if ((w_tlimit < 0.5)) {
      w_tlimit = 0.5;
    }

    if ((w_tlimit > 1)) {
      w_tlimit = 1;
    }
    p_gasl();
  }

}

function p_gasl() {
  gas_loading = ((gas_cone / 24) / (w_t * g_tlen));
  if ((gas_loading > 3)) {
    w_tc = ((gas_cone / 24) / (3 * g_tlen));
    if (((w_tc >= 0.3) && (w_tc <= 0.5))) {
      w_t = w_tc;
      return;
    }
    if ((w_tc < 0.3)) {
      w_tc = 0.3;
      //MsgBox("w_tc< 0.3");
    } else if ((w_tc > w_tlimit)) {
      if ((count1 != 0)) {
        nocone_c = nocone;
        w_bot = w_bot1;
        layer = (layer + 1);
        g_height = (0.15 * height_o);
        if ((g_height < 1.2)) {
          g_height = 1.2;
        }
        p_newangle();
        nocone = nocone_c;
        if (((w_tc >= 0.3) && (w_tc <= 0.5))) {
          w_t = w_tc;
          return;
        }
        w_tc1 = w_tc;
      } else {
        nocone = nocone_c;
        w_bot1 = w_bot;
        nocone_c = (nocone_c + 1);
        count1 = 1;
        p_newpro();
        if (((w_tc >= 0.3) && (w_tc <= 0.5))) {
          w_t = w_tc;
          return;
        }
        w_tc1 = w_tc;
      }
    } else {
      w_t = w_tc;
    }
  }
}

function p_suroverflow() {
  w_s = (w_bot - w_t);
  sur_overf = (flow_cone / (g_tlen * w_s));
  if ((sur_overf > 28)) {
    if ((sur_overf > 35)) {
      p_changedim();
    }
  }
  w_b = (w_bot - w_a);
  angle = Math.atan((g_height / ((w_b / 2) - (w_t / 2))));
  angle = (angle * (180 / pi));
}

function p_changedim() {
  if ((layer < 3)) {
    p_nocone();
    p_flows();
    p_gasl();
  } else if ((height1 > 4.5)) {
    height_o = (height_o - 0.25);
    area_n = (r_vol / height_o);
    g_height = (0.25 * height_o);
    if ((shape == 1)) {
      len1 = (area_n / width1);
      g_l = (width1 - 0.4);
      g_tlen = (len1 - 0.4);
      length1 = len1;
      p_nocone();
    } else {
      dia1 = Math.sqrt(((4 * area) / (22 / 7)));
      g_l = (dia - 0.4);
      g_tlen = (dia - 0.4);
      f_dia = dia1;
      p_nocone();
    }
    p_flows();
    p_appwidth();
    p_suroverflow();
  } else if ((olr > 0.75)) {
    olr = (olr - 0.1);
    r_vol = ((inflow * cod) / olr);
    // REACTOR VOLUME
    vss = ((inflow * cod) / slr);
    // Kg VSS
    s_vol = (vss / 25);
    // SLUDGE VOLUME
    if ((s_vol < (0.3 * r_vol))) {
      //MsgBox("svol satisfied");
      p_hrt(18, 6);
      if ((h == hrt)) {
        // Call p_prMath.floor
      } else {
        // CHECK FOR OLR
        r_vol = (hrt * (inflow / 24));
        olr = ((inflow * cod) / r_vol);
        p_gmainolr();
        // Call p_slr
        height1 = 6;
        while ((height1 >= 4.5)) {
          upv = (height1 / hrt);
          if (((upv >= 0.25) && (upv <= 0.7))) {
            break;
          } else {
            height1 = (height1 - 0.5);
          }
        }
        if (((upv < 0.25) || (upv > 0.7))) {
          height1 = 4.5;
          upv = (height1 / hrt);
        }
      }
    }
  } else {
    //MsgBox("Height=4.5 & olr=0.75");
  }

  if ((shape == 1)) {
    Opt1 = 1;
    p_areas();
  }

  if ((shape == 2)) {
    Opt1 = 2;
    p_areac("frmmedium");
  }

  vol1 = r_vol;
  area1 = area;
  nou = no1;
  width1 = width1;
  height_o = height1;
  angle = 45;
  w_t = 0.3;
  w_a = 0.2;
  g_height = (0.25 * height1);
  if ((Opt1 == 1)) {
    g_l = width1;
    g_tlen = length1;
  } else {
    g_l = f_dia;
    g_tlen = f_dia;
  }

  p_nocone();
  p_flows();
  count1 = 0;
  p_appwidth();
  p_gasl();
  p_suroverflow();
  p_launders();
  p_mainlaunder();
}

function p_gmainolr() {
  if ((olr < 0.75)) {
    olr = 0.75;
    p_hrt(24, 6);
    hrt = (r_vol / (inflow / 24));
    height1 = 6;
    do{
      upv = (height1 / hrt);
      if (((upv >= 0.25) && (upv <= 0.7))) {
        break; 
      } else {
        height1 = (height1 - 0.5);
      }
    }while(height1 >= 4.5);
  }
}

function p_newangle() {
  if ((layer > 3)) {
    p_changedim();
  } else {
    p_flows();
    p_appwidth();
    p_wtlimit();
    p_gasl();
  }
}

function p_newangle() {
  if ((layer > 3)) {
    p_changedim();
  } else {
    p_flows();
    p_appwidth();
    p_wtlimit();
    p_gasl();
  }
}

function p_launders() {
  nolaunder = (nocone_c + 1);
  if ((shape == 1)) {
    flow = (inf / nolaunder);
  } else {
    flow = flow_cone;
  }
  l_b = 0.2;
  do{
    l_h = Math.pow(((flow / 86400) / (1.375 * l_b)), (2 / 3));
    if ((l_h > 0.2)) {
      l_b = (l_b + 0.05);
    } else {
      if ((l_h < 0.15)) {
        l_h = 0.15;
      }
      break;
    }
  }while(l_b < 0.4);
  l_h = (l_h + 0.05);
}

function p_mainlaunder() {
  ml_w = 0.3;
  flow = (inf / 2);
  do{
    ml_h = Math.pow(((flow / 86400) / (1.375 * ml_w)), (2 / 3));
    if ((ml_h > 0.5)) {
      ml_w = (ml_w + 0.05);
    } else {
      break;
    }
  }while(ml_w < 0.75);
  R = Math.pow(((ml_h * ml_w) /(ml_w + (2 * ml_h))), (2 / 3));
  slope = Math.pow((((flow / 86400) *0.013) / (R * (ml_h * ml_w))), 2);
  s = (1 / slope);
  if ((ml_h < 0.1)) {
    ml_h = (ml_h + 0.5);
  } else {
    ml_h = (ml_h + 0.3);
  }
}

function p_gssd() {
  t_gas = (t_gas11 / no1);
  if ((area > 2.25)) {
    vol1 = r_vol;
    area1 = area;
    nou = no1;
    width11 = width1;
    height_o = height1;
    angle = 45;
    w_t = 0.3;
    w_a = 0.2;
    g_height = (0.25 * height1);
    if ((g_height < 1.2)) {
      g_height = 1.2;
    }

    if ((shape == 1)) {
      g_l = width1;
      g_tlen = length1;
    } else {
      g_l = f_dia;
      g_tlen = f_dia;
    }

    p_nocone();
    p_flows();
    count1 = 0;
    p_appwidth();
    p_wtlimit();
    p_gasl();
    p_suroverflow();
    p_launders();
    p_mainlaunder();
    r_vol = r_vol;
    height1 = height_o;
    area = (r_vol / height1);
  }else {
    g_height = (0.25 * height1);
    if ((g_height < 1.2)) {
      g_height = 1.2;
    }

    if ((shape == 1)) {
      g_l = (width1 - 0.2);
      g_tlen = (length1 - 0.2);
    } else {
      g_l = (f_dia - 0.2);
      g_tlen = (f_dia - 0.2);
    }
  }
  var alpha, bita;
  alpha = (((90 - angle) * pi) / 180);
  bita = (pi / 6);
  DeflectorHeight = (((w_a / 2) * Math.cos(alpha)) + ((w_a + 0.2) * Math.cos(bita)));
}

function p_newpro(){
 w_bot = g_l / nocone_c;
 p_flows();
 p_appwidth();
 p_wtlimit();
 p_gasl();
}

// Module Function End

//Very Low COD Design
function cod_500(){
  error = document.getElementById('error');
  error.innerHTML = "";
  document.getElementById('strFilter').innerHTML = "";
  inflow = $("#inflow").val();
  cod = $("#cod").val() / 1000;
  temp = $("#temp").val();
  shape = $("input[name=shape]:checked").val();
  if(inflow <= 2 && inflow == ""){
    error.innerHTML += "UASB reactor treatment is not advisable.<br/>";
  }
  if( (cod * 1000) > 500){
    error.innerHTML += "Select appropriate choice for COD < 500<br/>";
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

  inflow = parseFloat($("#inflow").val());
  cod = parseFloat($("#cod").val()) / 1000;
  temp = parseFloat($("#temp").val());
  shape = $("input[name=shape]:checked").val();

  olr_l = 1;
  olr_h = 2;
  m = 1;
  pi = 22 / 7;
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
      if(upv >= 0.3 && upv <= 0.4){
        break;
      }else{
        height1 = height1 - 0.25;
      }
    }while(height1 >= 4.5);
    if(upv < 0.3 || upv > 0.4){
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
      if(upv >= 0.3 && upv <= 0.4){
        break;
      }else{
        height1 = height1 - 0.25;
      }
    }while(height1 >= 4.5);
    if(upv < 0.3 || upv > 0.4){
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
  document.getElementById('efficiency').value = eff_min + " -- " + eff_max;
  document.getElementById('meth_prod').value = cum_methane.toFixed(3);
  document.getElementById('power').value = power.toFixed(3);
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
    p_areac("frmlowcod");
    document.getElementById('dia').value = f_dia.toFixed(3);
    document.getElementById('nou').value = no1;
  }
  p_gssd();
  p_inletnos();
  if(note1 == 1){
    document.getElementById('hdsw').innerHTML = "Sublateral Diameter (Inches):";
    document.getElementById('nozd').value = sublat_d_in.toFixed(2);
    document.getElementById('strFilter').innerHTML = capt;
    $("#noofnoz").hide();
  }else{
    document.getElementById('hdsw').innerHTML = "Nozzel Diameter(Inches):";
    document.getElementById('nozd').value = noze_d_in.toFixed(2);
    $("#noofnoz").show();
    document.getElementById('nonoze').value = nonoze;
  }
  document.getElementById('nolat').value = nolat;
  document.getElementById('main_dia').value = main_d_in.toFixed(2);
  document.getElementById('lat_dia').value = lat_d_in.toFixed(2);
   $(".disb").removeAttr("disabled");

  // Inside Functions
  function p_print(){
    document.getElementById('vol').value = r_vol.toFixed(3);
    document.getElementById('area').value = (r_vol / height1).toFixed(3);
    document.getElementById('hrt').value = hrt.toFixed(2);
    document.getElementById('height').value = height1;
    document.getElementById('olr1').value = olr.toFixed(2);
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
          if(upv >= 0.3 && upv <= 0.4){
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
            if(upv >= 0.3 && upv <= 0.4){
              break;
            }else{
              height1 = height1 - 0.25;
            }
          }while(height1 >= 4.5);
        }
      }
    }
  }
  //Inside Functions End

}

function cod_500_750(){
  error = document.getElementById('error');
  error.innerHTML = "";
  document.getElementById('strFilter').innerHTML = "";
  inflow = $("#inflow").val();
  cod = $("#cod").val() / 1000;
  temp = $("#temp").val();
  shape = $("input[name=shape]:checked").val();
  if(inflow <= 2 && inflow == ""){
    error.innerHTML += "UASB reactor treatment is not advisable.<br/>";
  }
  if( (cod * 1000) < 500 || (cod * 1000) > 750){
    error.innerHTML += "Select appropriate choice for COD > 500 and COD < 750<br/>";
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

  inflow = parseFloat($("#inflow").val());
  cod = parseFloat($("#cod").val()) / 1000;
  temp = parseFloat($("#temp").val());
  shape = $("input[name=shape]:checked").val();

  olr_l = 2;
  olr_h = 3;
  m = 1;
  pi = 22 / 7;
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
      if(upv >= 0.2 && upv <= 0.4){
        break;
      }else{
        height1 = height1 - 0.25;
      }
    }while(height1 >= 4.5);
    if(upv < 0.2 || upv > 0.4){
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
      if(upv >= 0.2 && upv <= 0.4){
        break;
      }else{
        height1 = height1 - 0.25;
      }
    }while(height1 >= 4.5);
    if(upv < 0.2 || upv > 0.4){
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
  document.getElementById('efficiency').value = eff_min + " -- " + eff_max;
  document.getElementById('meth_prod').value = cum_methane.toFixed(3);
  document.getElementById('power').value = power.toFixed(3);
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
    p_areac("frmlowcod");
    document.getElementById('dia').value = f_dia.toFixed(3);
    document.getElementById('nou').value = no1;
  }
  p_gssd();
  p_inletnos();
  if(note1 == 1){
    document.getElementById('hdsw').innerHTML = "Sublateral Diameter (Inches):";
    document.getElementById('nozd').value = sublat_d_in.toFixed(2);
    document.getElementById('strFilter').innerHTML = capt;
    $("#noofnoz").hide();
  }else{
    document.getElementById('hdsw').innerHTML = "Nozzel Diameter(Inches):";
    document.getElementById('nozd').value = noze_d_in.toFixed(2);
    $("#noofnoz").show();
    document.getElementById('nonoze').value = nonoze;
  }
  document.getElementById('nolat').value = nolat;
  document.getElementById('main_dia').value = main_d_in.toFixed(2);
  document.getElementById('lat_dia').value = lat_d_in.toFixed(2);
   $(".disb").removeAttr("disabled");

  // Inside Functions
  function p_print(){
    document.getElementById('vol').value = r_vol.toFixed(3);
    document.getElementById('area').value = (r_vol / height1).toFixed(3);
    document.getElementById('hrt').value = hrt.toFixed(2);
    document.getElementById('height').value = height1;
    document.getElementById('olr1').value = olr.toFixed(2);
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
    }while(olr >= 2);
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
          if(upv >= 0.2 && upv <= 0.4){
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
            if(upv >= 0.2 && upv <= 0.4){
              break;
            }else{
              height1 = height1 - 0.25;
            }
          }while(height1 >= 4.5);
        }
      }
    }
  }
  //Inside Functions End

}

function cod_750_2000(){
  error = document.getElementById('error');
  error.innerHTML = "";
  document.getElementById('strFilter').innerHTML = "";
  inflow = $("#inflow").val();
  cod = $("#cod").val() / 1000;
  temp = $("#temp").val();
  shape = $("input[name=shape]:checked").val();
  if(inflow <= 2 && inflow == ""){
    error.innerHTML += "UASB reactor treatment is not advisable.<br/>";
  }
  if( (cod * 1000) < 750 || (cod * 1000) > 2000){
    error.innerHTML += "Select appropriate choice for COD > 750 and COD < 2000<br/>";
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

  inflow = parseFloat($("#inflow").val());
  cod = parseFloat($("#cod").val()) / 1000;
  temp = parseFloat($("#temp").val());
  shape = $("input[name=shape]:checked").val();

  olr_l = 2;
  olr_h = 4;
  m = 1;
  pi = 22 / 7;
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
      if(upv >= 0.1 && upv <= 0.15){
        break;
      }else{
        height1 = height1 - 0.25;
      }
    }while(height1 >= 4.5);
    if(upv < 0.1 || upv > 0.15){
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
      if(upv >= 0.1 && upv <= 0.15){
        break;
      }else{
        height1 = height1 - 0.25;
      }
    }while(height1 >= 4.5);
    if(upv < 0.1 || upv > 0.15){
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
  document.getElementById('efficiency').value = eff_min + " -- " + eff_max;
  document.getElementById('meth_prod').value = cum_methane.toFixed(3);
  document.getElementById('power').value = power.toFixed(3);
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
    p_areac("frmlowcod");
    document.getElementById('dia').value = f_dia.toFixed(3);
    document.getElementById('nou').value = no1;
  }
  p_gssd();
  p_inletnos();
  if(note1 == 1){
    document.getElementById('hdsw').innerHTML = "Sublateral Diameter (Inches):";
    document.getElementById('nozd').value = sublat_d_in.toFixed(2);
    document.getElementById('strFilter').innerHTML = capt;
    $("#noofnoz").hide();
  }else{
    document.getElementById('hdsw').innerHTML = "Nozzel Diameter(Inches):";
    document.getElementById('nozd').value = noze_d_in.toFixed(2);
    $("#noofnoz").show();
    document.getElementById('nonoze').value = nonoze;
  }
  document.getElementById('nolat').value = nolat;
  document.getElementById('main_dia').value = main_d_in.toFixed(2);
  document.getElementById('lat_dia').value = lat_d_in.toFixed(2);
   $(".disb").removeAttr("disabled");

  // Inside Functions
  function p_print(){
    document.getElementById('vol').value = r_vol.toFixed(3);
    document.getElementById('area').value = (r_vol / height1).toFixed(3);
    document.getElementById('hrt').value = hrt.toFixed(2);
    document.getElementById('height').value = height1;
    document.getElementById('olr1').value = olr.toFixed(2);
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
    }while(olr >= 2);
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
          if(upv >= 0.1 && upv <= 0.15){
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
            if(upv >= 0.1 && upv <= 0.15){
              break;
            }else{
              height1 = height1 - 0.25;
            }
          }while(height1 >= 4.5);
        }
      }
    }
  }
  //Inside Functions End

}

function cod_2000_4000(){
  error = document.getElementById('error');
  error.innerHTML = "";
  document.getElementById('strFilter').innerHTML = "";
  inflow = $("#inflow").val();
  cod = $("#cod").val() / 1000;
  temp = $("#temp").val();
  shape = $("input[name=shape]:checked").val();
  if(inflow <= 2 && inflow == ""){
    error.innerHTML += "UASB reactor treatment is not advisable.<br/>";
  }
  if( (cod * 1000) < 2000 || (cod * 1000) > 4000){
    error.innerHTML += "Select appropriate choice for COD > 2000 and COD < 4000<br/>";
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

  inflow = parseFloat($("#inflow").val());
  cod = parseFloat($("#cod").val()) / 1000;
  temp = parseFloat($("#temp").val());
  shape = $("input[name=shape]:checked").val();

  olr_l = 4;
  olr_h = 5;
  m = 1;
  pi = 22 / 7;
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
      if(upv >= 0.05 && upv <= 0.15){
        break;
      }else{
        height1 = height1 - 0.25;
      }
    }while(height1 >= 4.5);
    if(upv < 0.05 || upv > 0.15){
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
      if(upv >= 0.05 && upv <= 0.15){
        break;
      }else{
        height1 = height1 - 0.25;
      }
    }while(height1 >= 4.5);
    if(upv < 0.05 || upv > 0.15){
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
  document.getElementById('efficiency').value = eff_min + " -- " + eff_max;
  document.getElementById('meth_prod').value = cum_methane.toFixed(3);
  document.getElementById('power').value = power.toFixed(3);
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
    p_areac("frmlowcod");
    document.getElementById('dia').value = f_dia.toFixed(3);
    document.getElementById('nou').value = no1;
  }
  p_gssd();
  p_inletnos();
  if(note1 == 1){
    document.getElementById('hdsw').innerHTML = "Sublateral Diameter (Inches):";
    document.getElementById('nozd').value = sublat_d_in.toFixed(2);
    document.getElementById('strFilter').innerHTML = capt;
    $("#noofnoz").hide();
  }else{
    document.getElementById('hdsw').innerHTML = "Nozzel Diameter(Inches):";
    document.getElementById('nozd').value = noze_d_in.toFixed(2);
    $("#noofnoz").show();
    document.getElementById('nonoze').value = nonoze;
  }
  document.getElementById('nolat').value = nolat;
  document.getElementById('main_dia').value = main_d_in.toFixed(2);
  document.getElementById('lat_dia').value = lat_d_in.toFixed(2);
   $(".disb").removeAttr("disabled");

  // Inside Functions
  function p_print(){
    document.getElementById('vol').value = r_vol.toFixed(3);
    document.getElementById('area').value = (r_vol / height1).toFixed(3);
    document.getElementById('hrt').value = hrt.toFixed(2);
    document.getElementById('height').value = height1;
    document.getElementById('olr1').value = olr.toFixed(2);
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
    }while(olr >= 4);
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
          if(upv >= 0.05 && upv <= 0.15){
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
            if(upv >= 0.05 && upv <= 0.15){
              break;
            }else{
              height1 = height1 - 0.25;
            }
          }while(height1 >= 4.5);
        }
      }
    }
  }
  //Inside Functions End

}

//High COD Design
function cod_4000_10000(){
	error = document.getElementById('error');
	error.innerHTML = "";
	document.getElementById('strFilter').innerHTML = "";
	inflow = $("#inflow").val();
	cod = $("#cod").val() / 1000;
	temp = $("#temp").val();
	shape = $("input[name=shape]:checked").val();
	if(inflow <= 2 && inflow == ""){
		error.innerHTML += "UASB reactor treatment is not advisable.<br/>";
	}
	if( (cod * 1000) < 3000 || (cod * 1000) > 10000 ){
		error.innerHTML += "Select appropriate choice for COD > 4000 and COD < 10,000<br/>";
	}
	if(cod <= 0){
		error.innerHTML += "Please eneter correct value of COD.<br/>";
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

	inflow = parseFloat($("#inflow").val());
	cod = parseFloat($("#cod").val()) / 1000;
	temp = parseFloat($("#temp").val());
	shape = $("input[name=shape]:checked").val();

	olr_l = 5;
  olr_h = 10;
  pi = 22 / 7;
  p_temp();
  if(olr_l < 4){
  	olr_l = 4;
  }
  if(olr_h < 4){
  	olr_h = 4;
  }
  if(olr_l > 15){
  	olr_l = 15;
  }
  if(olr_h > 15){
  	olr_h = 15;
  }
  olr = olr_h;
	slr = 0.2
	r_vol = (inflow * cod) / olr;
	vss = (inflow * cod) / slr;
	s_vol = vss / 30;
	
	if((s_vol <= (0.5 * r_vol))) {
	  p_hrt(24, 6);
	  if((h != hrt)) {
	    r_vol = (hrt *
	      (inflow / 24));
	    olr = ((inflow * cod) /
	      r_vol);
	    p_mainolr();
	    height1 = 6;
	    do {
	      upv = (height1 / hrt);
	      if(((upv >= 0.25) && (upv <= 0.7))) {
	        break; 
	      } else {
	        height1 = (height1 - 0.25);
	      }
	    }while(height1 <= 4.5);

	    if(((upv < 0.25) || (upv > 0.7))) {
	      height1 = 6;
	      upv = (height1 / hrt);
	    }
	  }

	} else {
	  p_mainolr();
	  if((h != hrt)) {
	    r_vol = (hrt * (inflow / 24));
	    olr = ((inflow * cod) / r_vol);
	    p_mainolr();
	    hrt = (r_vol / (inflow / 24));
	    height1 = 6;
	    do {
	      upv = (height1 / hrt);
	      if(((upv >= 0.25) &&
	          (upv <= 0.7))) {
	        break;
	      } else {
	        height1 = (height1 - 0.25);
	      }
	    }while(height1 <= 4.5);

	    if(((upv < 0.25) || (upv > 0.7))) {
	      height1 = 6;
	      upv = (height1 / hrt);
	    }
	  }
	}

	vol1 = r_vol;
 	area1 = r_vol / height1;
 	nou = no1;
 	width11 = width1;
 	height_o = height1;
 	p_methane();
 	document.getElementById('efficiency').value = eff_min + " -- " + eff_max;
 	document.getElementById('meth_prod').value = cum_methane.toFixed(3);
 	document.getElementById('power').value = power.toFixed(3);
 	p_print();
 	if(shape == 1){
		Opt1 = 1;
		p_areas();
		if( (height1 / length1) > 4 ){
			for(i = 4.5; i < height1;){
				upv = i / hrt;
				if(upv >= 0.25 && upv <= 0.7){
					height1 = i;
					break;
				}
				i = i + .25;
			}
			p_areas();
		}
		document.getElementById('length').value = length1.toFixed(3);
		document.getElementById('width').value = width1.toFixed(3);
		document.getElementById('nou').value = no1;
	}
	if(shape == 2){
		Opt1 = 2;
		p_areac("frmhigh");
		if( (height1 / f_dia) > 4 ){
			for(i = 4.5; i < height1;){
				upv = i / hrt;
				if(upv >= 0.25 && upv <= 0.7){
					height1 = i;
					break;
				}
				i = i + .25;
			}
			p_areac("frmhigh");
		}
		document.getElementById('dia').value = f_dia.toFixed(3);
		document.getElementById('nou').value = no1;
	}
	p_gssd();
 	p_inletnos();
 	if(note1 == 1){
 		document.getElementById('hdsw').innerHTML = "Sublateral Diameter (Inches):";
 		document.getElementById('nozd').value = sublat_d_in.toFixed(2);
 		document.getElementById('strFilter').innerHTML = capt;
 		$("#noofnoz").hide();
 	}else{
 		document.getElementById('hdsw').innerHTML = "Nozzel Diameter(Inches):";
 		document.getElementById('nozd').value = noze_d_in.toFixed(2);
 		$("#noofnoz").show();
 		document.getElementById('nonoze').value = nonoze;
 	}
 	document.getElementById('nolat').value = nolat;
 	document.getElementById('main_dia').value = main_d_in.toFixed(2);
 	document.getElementById('lat_dia').value = lat_d_in.toFixed(2);
   $(".disb").removeAttr("disabled");

 	// Inside Functions
	function p_print(){
		document.getElementById('vol').value = r_vol.toFixed(3);
		document.getElementById('area').value = (r_vol / height1).toFixed(3);
		document.getElementById('hrt').value = hrt.toFixed(2);
		document.getElementById('height').value = height1;
		document.getElementById('olr1').value = olr.toFixed(2);
		document.getElementById('upv').value = upv.toFixed(3);
		document.getElementById('slr').value = slr.toFixed(2);
	}

	function p_subslr(){
		do{
			vss = (inflow * cod) / slr;
	    s_vol = vss / 30;
	    if(s_vol < (0.5 * r_vol)){
	    	break;
	    }else{
	      slr = slr + 0.05;
	    }
		}while(slr < 0.65);
	}

	function p_slr(){
		if( slr >= 0.2 && slr <= 0.6 ){
			p_subslr();
		}else{
			if(slr < 0.2){
				slr = 0.2;
	    	p_subslr();
	   }else{
	   	if(slr > 0.6){
	   		slr = 0.6;
	      p_subslr();
	   	}
	   }
		}
	}

	function p_olr(){
		do{
			r_vol = (inflow * cod) / olr;
			p_slr();
			if(s_vol < (0.5 * r_vol)){
				break;
			}else{
				olr = olr - 0.1;
	 			slr = 0.2;
			}
		}while(olr >= 4);
		p_hrt(24, 6);
	}

	function p_mainolr(){
		if(olr >= olr_l && olr <= olr_h){
			slr = 0.2;
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
	  		if(upv < 0.15 || upv > 0.7){
	  		  height1 = 6;
        	upv = height1 / hrt;
      	}
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
	    		if(upv < 0.15 || upv > 0.7){
		  		  height1 = 6;
	        	upv = height1 / hrt;
	      	}
				}
			}
		}
	}
	//Inside Functions End

}

//Very High COD Design
function cod_10000(){
	error = document.getElementById('error');
	error.innerHTML = "";
	document.getElementById('strFilter').innerHTML = "";
	inflow = $("#inflow").val();
	cod = $("#cod").val() / 1000;
	temp = $("#temp").val();
	shape = $("input[name=shape]:checked").val();
	if(inflow <= 2 && inflow == ""){
		error.innerHTML += "UASB reactor treatment is not advisable.<br/>";
	}
	if((cod * 1000) < 10000 ){
		error.innerHTML += "Select appropriate choice for COD > 10,000<br/>";
	}
	if(cod <= 0){
		error.innerHTML += "Please eneter correct value of COD.<br/>";
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

	inflow = parseFloat($("#inflow").val());
	cod = parseFloat($("#cod").val()) / 1000;
	temp = parseFloat($("#temp").val());
	shape = $("input[name=shape]:checked").val();

	olr_l = 5;
	olr_h = 15;
	p_temp();
	if((olr_l < 5)) {
	  olr_l = 5;
	}

	if((olr_h < 5)) {
	  olr_h = 5;
	}

	if((olr_h > 20)) {
	  olr_h = 20;
	}

	olr = olr_h;
	slr = 0.2;
	r_vol = ((inflow * cod) / olr);
	vss = ((inflow * cod) / slr);
	if((s_vol < (0.5 * r_vol))) {
	  p_hrt();
	  if((h != hrt)) {
	    r_vol = (hrt * (inflow / 24));
	    olr = ((inflow * cod) / r_vol);
	    p_mainolr();
	    hrt = (r_vol / (inflow / 24));
	    height1 = 8;
	    do{
	      upv = (height1 / hrt);
	      if(((upv >= 0.15) && (upv <= 0.7))) {
	        break;
	      } else {
	        height1 = (height1 - 0.25);
	      }
	    }while((height1 >= 4.5));

	    if(((upv < 0.1) || (upv > 0.7))) {
	      height1 = 8;
	      upv = (height1 / hrt);
	    }

	  }

	} else {
	  p_mainolr();
	  if((h != hrt)) {
	    r_vol = (hrt * (inflow / 24));
	    olr = ((inflow * cod) / r_vol);
	    p_mainolr();
	    hrt = (r_vol / (inflow / 24));
	    height1 = 8;
	    do {
	      upv = (height1 / hrt);
	      if(((upv >= 0.15) && (upv <= 0.5))) {
	        break;
	      } else {
	        height1 = (height1 - 0.25);
	      }
	    }while((height1 >= 4.5)) 
	    if((upv < 0.1)) {
	      height1 = 8;
	      upv = (height1 / hrt);
	    }
	  }
	}
	vol1 = r_vol;
	area1 = (r_vol / height1);
	nou = no1;
	width11 = width1;
	height_o = height1;
	p_methane();
 	document.getElementById('efficiency').value = eff_min + " -- " + eff_max;
 	document.getElementById('meth_prod').value = cum_methane.toFixed(3);
 	document.getElementById('power').value = power.toFixed(3);
 	p_print();
 	if(shape == 1){
		Opt1 = 1;
		p_areas();
		document.getElementById('length').value = length1.toFixed(3);
		document.getElementById('width').value = width1.toFixed(3);
		document.getElementById('nou').value = no1;
	}
	if(shape == 2){
		Opt1 = 2;
		p_areac("frmveryhi");
		document.getElementById('dia').value = f_dia.toFixed(3);
		document.getElementById('nou').value = no1;
	}
	p_gssd();
 	p_inletnos();
 	if(note1 == 1){
 		document.getElementById('hdsw').innerHTML = "Sublateral Diameter (Inches):";
 		document.getElementById('nozd').value = sublat_d_in.toFixed(2);
 		document.getElementById('strFilter').innerHTML = capt;
 		$("#noofnoz").hide();
 	}else{
 		document.getElementById('hdsw').innerHTML = "Nozzel Diameter(Inches):";
 		document.getElementById('nozd').value = noze_d_in.toFixed(2);
 		$("#noofnoz").show();
 		document.getElementById('nonoze').value = nonoze;
 	}
 	document.getElementById('nolat').value = nolat;
 	document.getElementById('main_dia').value = main_d_in.toFixed(2);
 	document.getElementById('lat_dia').value = lat_d_in.toFixed(2);
  $(".disb").removeAttr("disabled");

 	// Inside Functions
	function p_print(){
		document.getElementById('vol').value = r_vol.toFixed(3);
		document.getElementById('area').value = (r_vol / height1).toFixed(3);
		document.getElementById('hrt').value = hrt.toFixed(2);
		document.getElementById('height').value = height1;
		document.getElementById('olr1').value = olr.toFixed(2);
		document.getElementById('upv').value = upv.toFixed(3);
		document.getElementById('slr').value = slr.toFixed(2);
	}

	function p_hrt() {
	  hrt = (r_vol / (inflow / 24));
	  h = hrt;
	  if(((hrt >= 6) && (hrt <= 24))) {
	    p_height();
	  } else if((hrt < 6)) {
	    hrt = 6;
	    p_height();
	  } else if((hrt > 24)) {
	    hrt = 24;
	    p_height();
	  }
	}

	function p_height() {
	  do{
	    height1 = 8;
	    while((height1 >= 4.5)) {
	      upv = (height1 / hrt);
	      if(((upv >= 0.1) &&
	          (upv <= 0.7))) {
	        break;
	      } else {
	        height1 = (height1 - 0.25);
	      }
	    }
	    if(((upv >= 0.1) && (upv <= 0.7))) {
	      break;
	    } else {
	      hrt = (hrt + 0.5);
	    }
	  }while((hrt <= 24));
	}

	function p_subslr(){
		do{
			vss = (inflow * cod) / slr;
	    s_vol = vss / 30;
	    if(s_vol < (0.5 * r_vol)){
	    	break;
	    }else{
	      slr = slr + 0.05;
	    }
		}while(slr < 1.05);
	}

	function p_slr(){
		if( slr >= 0.2 && slr <= 1 ){
			p_subslr();
		}else{
			if(slr < 0.2){
				slr = 0.2;
	    	p_subslr();
	   }else{
	   	if(slr > 1){
	   		slr = 1;
	      p_subslr();
	   	}
	   }
		}
	}

	function p_olr(){
		do{
			r_vol = (inflow * cod) / olr;
			p_slr();
			if(s_vol < (0.5 * r_vol)){
				break;
			}else{
				olr = olr - 0.1;
	 			slr = 0.2;
			}
		}while(olr >= 5);
		p_hrt();
	}

	function p_mainolr() {
	  if(((olr >= olr_l) && (olr <= olr_h))) {
	    p_olr();
	  } else if((olr < olr_l)) {
	    olr = olr_l;
	    p_olr();
	    hrt = (r_vol / (inflow / 24));
	    height1 = 8;
	    do{
	      upv = (height1 / hrt);
	      if(((upv >= 0.1) && (upv <= 0.7))) {
	        break;
	      } else {
	        height1 = (height1 - 0.25);
	      }
	    }while(height1 >= 4.5);

	    if(((upv < 0.1) || (upv > 0.7))) {
	      height1 = 8;
	      upv = (height1 / hrt);
	    }
	  } else if((olr > olr_h)) {
	    olr = olr_h;
	    p_olr();
	    hrt = (r_vol / (inflow / 24));
	    height1 = 8;
	    do {
	      upv = (height1 / hrt);
	      if(((upv >= 0.1) && (upv <= 0.7))) {
	        break;
	      } else {
	        height1 = (height1 - 0.25);
	      }
	    }while(height1 >= 4.5) ;

	    if(((upv < 0.15) || (upv > 0.7))) {
	      height1 = 8;
	      upv = (height1 / hrt);
	    }
	  }
	}
	//Inside Functions End

}
// Module

function savePDF() {  
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
  doc.text(15, 35, 'Average wastewater temperature during winter: ' + document.getElementById("temp").value + ' Degree C');

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
  doc.text(15, 90, 'Number of Units: ' +  no1);
  if(shape == 1){
    doc.text(15, 95, 'Height: ' + document.getElementById("height").value + ' m + Free board 0.5 m');
    doc.text(15, 100, 'Length: ' + document.getElementById("length").value + ' m');
    doc.text(15, 105, 'Width: ' + document.getElementById("width").value + ' m');
  }else{
    doc.text(15, 95, 'Height: ' + document.getElementById("height").value + ' m + Free board 0.5 m');
    doc.text(15, 100, 'Diameter: ' + document.getElementById("dia").value + ' m');
  }

  doc.setFontType("bold");
  doc.text(10, 115, 'G.S.S. Design');
  doc.setFontType("normal");
  doc.text(15, 120, 'Number of Cones per Layer: ' +  nocone_c);
  doc.text(15, 125, 'Number of Layers per Unit: ' +  layer);
  doc.text(15, 130, 'Bottom Width: ' + document.getElementById("inflow").value + ' m');
  doc.text(15, 135, 'Top Width: ' + document.getElementById("inflow").value + ' m');
  doc.text(15, 140, 'Height: ' + document.getElementById("inflow").value + ' m (Please refer to the figure given in G.S.S. window in software.)');
  doc.text(15, 145, 'Aperture Width: ' + document.getElementById("inflow").value + ' m');
  doc.text(15, 150, 'Angle of inclination with horizontal: ' + document.getElementById("inflow").value + ' Degrees');
  doc.text(15, 155, 'Width of Deflector beam: ' + document.getElementById("inflow").value + ' m');
  doc.text(15, 160, 'Number of Effluent Launders: ' +  nolaunder);
  doc.text(15, 165, 'Width of Effluent Launder: ' + document.getElementById("inflow").value + ' m');
  doc.text(15, 170, 'Depth of Effluent Launder: ' + document.getElementById("inflow").value + ' m');
  doc.text(15, 175, 'Main Launder Width: ' + document.getElementById("inflow").value + ' m');
  doc.text(15, 180, 'Main Launder Height: ' + document.getElementById("inflow").value + ' m');
  doc.text(15, 185, 'Main Launder Bed Slope: ' + document.getElementById("inflow").value + ' in');


  doc.setFontType("bold");
  doc.text(10, 195, 'Inflow Arrangement');
  doc.setFontType("normal");
  doc.text(15, 200, 'Main Pipe Diameter: ' + document.getElementById("main_dia").value + ' Inch');
  doc.text(15, 205, 'Number of Laterals: ' +  nolat);
  doc.text(15, 210, 'Diameter of Lateral: ' + document.getElementById("lat_dia").value + ' Inch');
  if(note1 == 1){
    doc.text(15, 215, 'Sublateral Diameter: ' + document.getElementById("nozd").value + ' Inch');
    doc.text(15, 220, document.getElementById("strFilter").innerHTML);
  }else{
    doc.text(15, 215, 'Nozzle Diameter: ' + document.getElementById("nozd").value + ' Inch');
    doc.text(15, 220, 'Number of Nozzles per Lateral: ' +  nonoze); 
  }  
  doc.output('dataurlnewwindow');

    // var doc = new jsPDF();
  // doc.setProperties({
  //     title: 'Reactor Design',     
  //     author: 'Pankaj Sarkar'
  // });

  // console.log(imgData);
  // //imgData = 'assets/img/gssd.png';
  // doc.addImage(imgData, 'PNG', 10, 10, 70, 90);
  // doc.output('dataurlnewwindow');
}

function gss_design(){
  document.getElementById("gss_lbht").innerHTML = g_height.toFixed(3);
  document.getElementById("lwt").innerHTML = w_t.toFixed(3);
  document.getElementById("lba").innerHTML = angle.toFixed(3);
  document.getElementById("laun_h").innerHTML = l_h.toFixed(3);
  document.getElementById("laun_b").innerHTML = l_b;
  document.getElementById("gss_lbw").innerHTML = w_b.toFixed(3);
  document.getElementById("lbapw").innerHTML = w_a.toFixed(3);
  document.getElementById("lblDeflectorHeight").innerHTML = DeflectorHeight.toFixed(3);
  document.getElementById("lbdef").innerHTML = (w_a + 0.2).toFixed(3);

  document.getElementById("nocone_c").value = nocone_c;
  document.getElementById("layer").value = layer;
  document.getElementById("ml_w").value = ml_w;
  document.getElementById("ml_h").value = ml_h.toFixed(2);
  document.getElementById("slope").value = '1 in ' + Math.floor(s);
  document.getElementById("nolaunder").value = nolaunder;
}

function startup_reactor(){
  function print_val(){
    document.getElementById('inflow1').value = inflow1.toFixed(2);
    document.getElementById('dilinflow').value = dilinflow.toFixed(2);
    document.getElementById('olr2').value = olr1.toFixed(2);
    document.getElementById('hrt1').value = hrt1.toFixed(2);
    document.getElementById('upv1').value = upv1.toFixed(2);
  }

  txtDilcod = parseFloat($("#dilcod").val());
  dilinflow = 0;
  cod1 = cod;
  upv1 = upv;
  dilcod = (txtDilcod / 1000);
  hrt1 = hrt;
  inflow1 = inflow;
  slr1 = slr;
  olr1 = olr;
  height11 = height1;
  vol = r_vol;
  if(cod1 <= 3) {
    if((upv1 > 0.25)) {
      upv1 = 0.25;
      hrt1 = (height11 / upv1);
      inflow1 = ((vol * 24) / hrt1);
      olr1 = ((inflow1 * cod1) / vol);
    }
    print_val();
  }

  if(cod1 >= 3){
    if((dilcod == 0)) {
      y = prompt("You have not entered cod of dilution water.Do you want to enter it?(Y/N)");
      if((y.trim() == "Y")) {
        $('#dilcod').focus();
      }
      return;
    }

    hrt1 = 16;
    n_cod = 2.5;
    do{
      do{
        qs = ((vol * 24) / hrt1);
        qp = Math.abs(cod1 - n_cod);
        qd = Math.abs(dilcod - n_cod);
        dilinflow = (qs / ((qd / qp) +  1));
        inflow1 = ((qd / qp) * dilinflow);
        olr1 = (((inflow1 + dilinflow) * n_cod) / vol);
        if((olr1 < 4)) {
          break;
        }
        n_cod = (n_cod - 0.1);
      }while(n_cod > 1.5);
      if((olr1 < 4)) {
        break;
      }
      hrt1 = (hrt1 - 0.5);
    }while(hrt1 >= 8);
    upv1 = (height11 / hrt1);
    print_val();
  }
}

function gss_estimate(){
  error = document.getElementById('error');
  error.innerHTML = "";
  var totalqty_cc, wallthk, rate_walls, rate_steel, rate_gss, tcost_reactor, tcost_gss, s1, total_cost, peri, len1, ln_sect, qty_pcc, totalqty_pcc, tcost_pcc;
  var rate_pcc, angl, ExcavationCost, ExcavationRate, PlasteringCost, PlasteringQty, PlasteringRate ,FormWorkCost, FormWorkQty, FormWorkRate , WaterProofingRate;
  var WaterProofingCost, AntiCorrosionRate, AntiCorrosionCost, ReactorSurfaceArea, GSSSurfaceArea, qtyLaunder, gss, optRcc;
  
  rate_pcc = $("#rate_pcc").val();
  wall_material = $("#wall_material input[name=wall_mat]:checked").val();
  if(wall_material == 1){
    wallthk = 0.2;
    rate_walls = $("#rate_walls").val();
    rate_steel = $("#rate_steel").val();
    PlasteringRate = $('#PlasteringRate').val();
    FormWorkRate = $('#FormWorkRate').val();
  }else{
    $("#plate_thickness :selected").text();
    wallthk = $("#plate_thickness").val() / 1000;
    rate_walls = $("#rate_steel").val();
  }

  ExcavationRate = $('#ExcavationRate').val();
  WaterProofingRate = $('#WaterProofingRate').val();
  inc_len = Math.sqrt(Math.pow(g_height, 2) + Math.pow((w_b / 2), 2));
  gss_material = $("#gss_material input[name=gss_mat]:checked").val();
  if(gss_material == 2){
    rate_gss = $("#txtRatePropy").val();
  }else{
    rate_gss = $("#rate_steel").val();
    AntiCorrosionRate = $('#AntiCorrosionRate').val();
  }
  $("#gss_thickness :selected").text();
  thk = $("#gss_thickness").val()/ 1000;
  
  if(rate_pcc == 0){
    error.innerHTML += "Enter valid P.C.C. Rate.<br/>";
  }
  if( wall_material == 1 && rate_walls == 0){
    error.innerHTML += "Enter valid R.C.C. Rate.<br/>";
  }
  if(rate_steel == 0){
    error.innerHTML += "Enter valid Steel Rate.<br/>";
  }
  if(gss_material == 2 && rate_gss == 0){
    error.innerHTML += "Enter valid rate of Polypropylene Sheets.<br/>";
  }
  if(error.innerHTML != ""){
    $('#mymodal').modal('show');
    return false;
  }

  if((Opt1 == 1)) {
    len1 = (no1 + 1) * 0.2 + 0.4;
    s1 = ((width1 + 0.4) * (no1 * length1) * 0.2);
    qty_walls = (no1 + 1) * (width1 * (height1 + 0.5) * wallthk);
    qty_walls = qty_walls + no1 * 2 * (length1 * (height1 + 0.5) * wallthk);
    totalqty_pcc = s1 + len1;
    ReactorSurfaceArea = (width1 * length1 * no1) + (2 * width1 * (height1 + 0.5) * no1) + (2 * length1 * (height1 + 0.5) * no1);
    if((gss_material == 1)) {
      gss = ((2 * inc_len) + (0.2 * 3)) * (g_tlen - 0.4) * thk;
    } else if((gss_material == 2)) {
      gss = ((2 * inc_len) + (0.3 * 3)) * (g_tlen - 0.4);
    }

    qtyLaunder = nolaunder * length1 * 0.5;
    qty_gss = (((gss) * nocone_c * layer) + qtyLaunder * thk) * no1;
    GSSSurfaceArea = ((((2 * inc_len) + (0.3 * 3)) * (g_tlen - 0.4) * nocone_c * layer) + qtyLaunder) * no1;
    ExcavationCost = (ExcavationRate * (width1 + 0.4) * (length1 + 0.4) * 1.5) * no1;
    PlasteringQty = ((2 * 2 * (length1 * (height1 + 0.5) + width1 * (height1 + 0.5))) + (length1 * width1)) * no1;
    FormWorkQty = 2 * 2 * (length1 * (height1 + 0.5) + width1 * (height1 + 0.5)) * no1;
  } else {
    s1 = no1 * (pi / 4) * (Math.pow(f_dia + 0.4),  2) * 0.2;
    peri = (pi * (f_dia + 0.2));
    qty_walls = (no1 * (peri * ((height1 + 0.5) * wallthk)));
    totalqty_pcc = s1;
    ln_sect = (f_dia / (nocone_c + 1));
    c_len = 0;
    rim = (nocone_c % 2);
    if((rim == 0)) {
      f = (nocone_c / 2);
    } else {
      f = Math.floor(nocone_c / 2) + 1;
      o = 1;
    }

    R = (f_dia.toFixed(3) - 0.4) / 2;
    for(i = 0; i <= (f - 1); i++) {
      ab = ((w_b * i) + (w_b / 2));
      ratio = ((R - ab) / R);
      arccos = Math.atan(-ratio / Math.sqrt(-ratio * ratio + 1)) + 2 * Math.atan(1);
      angl = arccos;
      c_len = (c_len + 2 * (R * Math.sin(angl)));
      if(((i == (f - 1)) && (o == 1))) { 
        c_len = (c_len - (R * Math.sin(angl)));
      }
    }

    ReactorSurfaceArea = (((peri * (height1 + 0.5)) + (Math.pow((pi * f_dia), 2) /  4)) * no1);
    if((gss_material == 1)) {
      gss = (((2 * inc_len) + (0.3 * 3)) * (c_len * thk));
    } else if((gss_material == 2)) {
      gss = (((2 * inc_len) + (0.3 * 3)) * c_len);
    }

    qtyLaunder = (f_dia * (nolaunder * 0.5));
    qty_gss = (((gss * layer) + (qtyLaunder * thk)) * no1);
    GSSSurfaceArea = (((((2 * inc_len) + (0.3 * 3)) * (c_len * layer)) + qtyLaunder) * no1);
    //console.log(layer + ' ' + no1 + ' ' + qty_gss + ' ');
    ExcavationCost = (ExcavationRate * ((pi / 4) * Math.pow((f_dia + 1), 2) * 1.5)) * no1;
    PlasteringQty = ((2 * (pi * f_dia * (height1 + 0.5))) + (pi / 4) * Math.pow(f_dia, 2)) * no1;
    FormWorkQty = (2 * ((pi * (f_dia * (height1 + 0.5))) * no1));
  }

  if(wall_material == 1){
    totalqty_cc = s1 + qty_walls;
    tcost_cc = totalqty_cc * rate_walls;
  }
  if(((wall_material == 1) && (gss_material == 1))) {
    tcost_reactor = tcost_cc + (((totalqty_cc * 0.01) * 7850) * rate_steel);
    tcost_gss =  qty_gss * 7850 * rate_gss;
    WaterProofingCost = WaterProofingRate * ReactorSurfaceArea;
    AntiCorrosionCost = AntiCorrosionRate * 2 * GSSSurfaceArea;
    FormWorkCost = FormWorkRate * FormWorkQty;
    PlasteringCost = PlasteringRate * PlasteringQty;
  } else if((wall_material == 1 && gss_material == 2)) {
    tcost_reactor = (tcost_cc + (((totalqty_cc * 0.01) * 7850) * rate_steel));
    tcost_gss = (qty_gss * rate_gss);
    WaterProofingCost = (WaterProofingRate * ReactorSurfaceArea);
    FormWorkCost = (FormWorkRate * FormWorkQty);
    PlasteringCost = (PlasteringRate * PlasteringQty);
  } else if((wall_material == 2 && gss_material == 1)) {
    tcost_reactor = (qty_walls * (7850 * rate_walls));
    tcost_gss = (qty_gss * (7850 * rate_gss));
    AntiCorrosionCost = (AntiCorrosionRate * (2 * (GSSSurfaceArea + ReactorSurfaceArea)));
    WaterProofingCost = (WaterProofingRate * ReactorSurfaceArea);
  } else if((wall_material == 2 && gss_material == 2)) {
    tcost_reactor = (qty_walls * (7850 * rate_walls));
    tcost_gss = (qty_gss * rate_gss);
    //AntiCorrosionCost = (AntiCorrosionRate * (2 * ReactorSurfaceArea));
    WaterProofingCost = (WaterProofingRate * ReactorSurfaceArea);
  }

  PlasteringCost = PlasteringCost || 0;
  FormWorkCost = FormWorkCost || 0;
  AntiCorrosionCost = AntiCorrosionCost || 0;
  WaterProofingCost = WaterProofingCost || 0;

  console.log(PlasteringCost + " " + FormWorkCost + " " + AntiCorrosionCost + " " + WaterProofingCost);

  tcost_pcc = (totalqty_pcc * rate_pcc);
  total_cost = tcost_pcc + tcost_reactor + tcost_gss + ExcavationCost + PlasteringCost + FormWorkCost + AntiCorrosionCost + WaterProofingCost;
  total_cost = (1.2 * total_cost);
  document.getElementById('tcost_pcc').value = tcost_pcc.toFixed(2);
  document.getElementById('tcost_reactor').value = tcost_reactor.toFixed(2);
  document.getElementById('tcost_gss').value = tcost_gss.toFixed(2);
  document.getElementById('total_cost').value = total_cost.toFixed(2);

}

function startup_clear(){
  $('#start_modal input[type="number"]').val('');
}

function estimate_clear(){
  $('#estimate_modal input[type="number"]').val('');
}