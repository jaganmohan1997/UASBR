// Here New
function p_nocone() {
  pi = (22 / 7);
  a = ((angle * pi) / 180);
  delta_h = ((w_t / 2) * Math.tan(a));
  w_bot = ((2 * ((g_height + delta_h) / Math.tan(angle))) + w_a);
  no = Math.round((g_l / w_bot));
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
  angle = Atn((g_height / ((w_b / 2) - (w_t / 2))));
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
        // Call p_prMath.round
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
