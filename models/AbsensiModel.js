import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS } from "../config/Database.js"

export const get = (req, callback) => { 
    const sqlSelect = 'SELECT ' +
        'rs_id, ' +
        'nama_rs, ' +
        'kab_kota.nama as kab_kota, ' +
        'CASE ' +
        'WHEN ROUND (( ' +
            'rl_31_bulan_1 + rl_31_bulan_2 + rl_31_bulan_3 + rl_31_bulan_4 + rl_31_bulan_5 + rl_31_bulan_6 + rl_31_bulan_7 + rl_31_bulan_8 + rl_31_bulan_9 + rl_31_bulan_10 + rl_31_bulan_11 + rl_31_bulan_12 + ' +
            'rl_32_bulan_1 + rl_32_bulan_2 + rl_32_bulan_3 + rl_32_bulan_4 + rl_32_bulan_5 + rl_32_bulan_6 + rl_32_bulan_7 + rl_32_bulan_8 + rl_32_bulan_9 + rl_32_bulan_10 + rl_32_bulan_11 + rl_32_bulan_12 + ' +
            'rl_33_bulan_1 + rl_33_bulan_2 + rl_33_bulan_3 + rl_33_bulan_4 + rl_33_bulan_5 + rl_33_bulan_6 + rl_33_bulan_7 + rl_33_bulan_8 + rl_33_bulan_9 + rl_33_bulan_10 + rl_33_bulan_11 + rl_33_bulan_12 + ' +
            'rl_34_bulan_1 + rl_34_bulan_2 + rl_34_bulan_3 + rl_34_bulan_4 + rl_34_bulan_5 + rl_34_bulan_6 + rl_34_bulan_7 + rl_34_bulan_8 + rl_34_bulan_9 + rl_34_bulan_10 + rl_34_bulan_11 + rl_34_bulan_12 + ' +
            'rl_35_bulan_1 + rl_35_bulan_2 + rl_35_bulan_3 + rl_35_bulan_4 + rl_35_bulan_5 + rl_35_bulan_6 + rl_35_bulan_7 + rl_35_bulan_8 + rl_35_bulan_9 + rl_35_bulan_10 + rl_35_bulan_11 + rl_35_bulan_12 + ' +
            'rl_36_bulan_1 + rl_36_bulan_2 + rl_36_bulan_3 + rl_36_bulan_4 + rl_36_bulan_5 + rl_36_bulan_6 + rl_36_bulan_7 + rl_36_bulan_8 + rl_36_bulan_9 + rl_36_bulan_10 + rl_36_bulan_11 + rl_36_bulan_12 + ' +
            'rl_37_bulan_1 + rl_37_bulan_2 + rl_37_bulan_3 + rl_37_bulan_4 + rl_37_bulan_5 + rl_37_bulan_6 + rl_37_bulan_7 + rl_37_bulan_8 + rl_37_bulan_9 + rl_37_bulan_10 + rl_37_bulan_11 + rl_37_bulan_12 + ' +
            'rl_38_bulan_1 + rl_38_bulan_2 + rl_38_bulan_3 + rl_38_bulan_4 + rl_38_bulan_5 + rl_38_bulan_6 + rl_38_bulan_7 + rl_38_bulan_8 + rl_38_bulan_9 + rl_38_bulan_10 + rl_38_bulan_11 + rl_38_bulan_12 + ' +
            'rl_39_bulan_1 + rl_39_bulan_2 + rl_39_bulan_3 + rl_39_bulan_4 + rl_39_bulan_5 + rl_39_bulan_6 + rl_39_bulan_7 + rl_39_bulan_8 + rl_39_bulan_9 + rl_39_bulan_10 + rl_39_bulan_11 + rl_39_bulan_12 + ' +
            'rl_310_bulan_1 + rl_310_bulan_2 + rl_310_bulan_3 + rl_310_bulan_4 + rl_310_bulan_5 + rl_310_bulan_6 + rl_310_bulan_7 + rl_310_bulan_8 + rl_310_bulan_9 + rl_310_bulan_10 + rl_310_bulan_11 + rl_310_bulan_12 + ' +
            'rl_311 + ' +
            'rl_312_bulan_1 + rl_312_bulan_2 + rl_312_bulan_3 + rl_312_bulan_4 + rl_312_bulan_5 + rl_312_bulan_6 + rl_312_bulan_7 + rl_312_bulan_8 + rl_312_bulan_9 + rl_312_bulan_10 + rl_312_bulan_11 + rl_312_bulan_12 + ' +
            'rl_313 + ' +
            'rl_314_bulan_1 + rl_314_bulan_2 + rl_314_bulan_3 + rl_314_bulan_4 + rl_314_bulan_5 + rl_314_bulan_6 + rl_314_bulan_7 + rl_314_bulan_8 + rl_314_bulan_9 + rl_314_bulan_10 + rl_314_bulan_11 + rl_314_bulan_12 + ' +
            'rl_315 + rl_316 + rl_317 + rl_318 + rl_319 + ' +
            'rl_41_bulan_1 + rl_41_bulan_2 + rl_41_bulan_3 + rl_41_bulan_4 + rl_41_bulan_5 + rl_41_bulan_6 + rl_41_bulan_7 + rl_41_bulan_8 + rl_41_bulan_9 + rl_41_bulan_10 + rl_41_bulan_11 + rl_41_bulan_12 + ' +
            'rl_42_bulan_1 + rl_42_bulan_2 + rl_42_bulan_3 + rl_42_bulan_4 + rl_42_bulan_5 + rl_42_bulan_6 + rl_42_bulan_7 + rl_42_bulan_8 + rl_42_bulan_9 + rl_42_bulan_10 + rl_42_bulan_11 + rl_42_bulan_12 + ' +
            'rl_43_bulan_1 + rl_43_bulan_2 + rl_43_bulan_3 + rl_43_bulan_4 + rl_43_bulan_5 + rl_43_bulan_6 + rl_43_bulan_7 + rl_43_bulan_8 + rl_43_bulan_9 + rl_43_bulan_10 + rl_43_bulan_11 + rl_43_bulan_12 + ' +
            'rl_51_bulan_1 + rl_51_bulan_2 + rl_51_bulan_3 + rl_51_bulan_4 + rl_51_bulan_5 + rl_51_bulan_6 + rl_51_bulan_7 + rl_51_bulan_8 + rl_51_bulan_9 + rl_51_bulan_10 + rl_51_bulan_11 + rl_51_bulan_12 + ' +
            'rl_52_bulan_1 + rl_52_bulan_2 + rl_52_bulan_3 + rl_52_bulan_4 + rl_52_bulan_5 + rl_52_bulan_6 + rl_52_bulan_7 + rl_52_bulan_8 + rl_52_bulan_9 + rl_52_bulan_10 + rl_52_bulan_11 + rl_52_bulan_12 + ' +
            'rl_53_bulan_1 + rl_53_bulan_2 + rl_53_bulan_3 + rl_53_bulan_4 + rl_53_bulan_5 + rl_53_bulan_6 + rl_53_bulan_7 + rl_53_bulan_8 + rl_53_bulan_9 + rl_53_bulan_10 + rl_53_bulan_11 + rl_53_bulan_12 ' +
        ') * 100 / 223, 2) = 100 ' +
        'THEN 100 ' +
        'WHEN ROUND (( ' +
            'rl_31_bulan_1 + rl_31_bulan_2 + rl_31_bulan_3 + rl_31_bulan_4 + rl_31_bulan_5 + rl_31_bulan_6 + rl_31_bulan_7 + rl_31_bulan_8 + rl_31_bulan_9 + rl_31_bulan_10 + rl_31_bulan_11 + rl_31_bulan_12 + ' +
            'rl_32_bulan_1 + rl_32_bulan_2 + rl_32_bulan_3 + rl_32_bulan_4 + rl_32_bulan_5 + rl_32_bulan_6 + rl_32_bulan_7 + rl_32_bulan_8 + rl_32_bulan_9 + rl_32_bulan_10 + rl_32_bulan_11 + rl_32_bulan_12 + ' +
            'rl_33_bulan_1 + rl_33_bulan_2 + rl_33_bulan_3 + rl_33_bulan_4 + rl_33_bulan_5 + rl_33_bulan_6 + rl_33_bulan_7 + rl_33_bulan_8 + rl_33_bulan_9 + rl_33_bulan_10 + rl_33_bulan_11 + rl_33_bulan_12 + ' +
            'rl_34_bulan_1 + rl_34_bulan_2 + rl_34_bulan_3 + rl_34_bulan_4 + rl_34_bulan_5 + rl_34_bulan_6 + rl_34_bulan_7 + rl_34_bulan_8 + rl_34_bulan_9 + rl_34_bulan_10 + rl_34_bulan_11 + rl_34_bulan_12 + ' +
            'rl_35_bulan_1 + rl_35_bulan_2 + rl_35_bulan_3 + rl_35_bulan_4 + rl_35_bulan_5 + rl_35_bulan_6 + rl_35_bulan_7 + rl_35_bulan_8 + rl_35_bulan_9 + rl_35_bulan_10 + rl_35_bulan_11 + rl_35_bulan_12 + ' +
            'rl_36_bulan_1 + rl_36_bulan_2 + rl_36_bulan_3 + rl_36_bulan_4 + rl_36_bulan_5 + rl_36_bulan_6 + rl_36_bulan_7 + rl_36_bulan_8 + rl_36_bulan_9 + rl_36_bulan_10 + rl_36_bulan_11 + rl_36_bulan_12 + ' +
            'rl_37_bulan_1 + rl_37_bulan_2 + rl_37_bulan_3 + rl_37_bulan_4 + rl_37_bulan_5 + rl_37_bulan_6 + rl_37_bulan_7 + rl_37_bulan_8 + rl_37_bulan_9 + rl_37_bulan_10 + rl_37_bulan_11 + rl_37_bulan_12 + ' +
            'rl_38_bulan_1 + rl_38_bulan_2 + rl_38_bulan_3 + rl_38_bulan_4 + rl_38_bulan_5 + rl_38_bulan_6 + rl_38_bulan_7 + rl_38_bulan_8 + rl_38_bulan_9 + rl_38_bulan_10 + rl_38_bulan_11 + rl_38_bulan_12 + ' +
            'rl_39_bulan_1 + rl_39_bulan_2 + rl_39_bulan_3 + rl_39_bulan_4 + rl_39_bulan_5 + rl_39_bulan_6 + rl_39_bulan_7 + rl_39_bulan_8 + rl_39_bulan_9 + rl_39_bulan_10 + rl_39_bulan_11 + rl_39_bulan_12 + ' +
            'rl_310_bulan_1 + rl_310_bulan_2 + rl_310_bulan_3 + rl_310_bulan_4 + rl_310_bulan_5 + rl_310_bulan_6 + rl_310_bulan_7 + rl_310_bulan_8 + rl_310_bulan_9 + rl_310_bulan_10 + rl_310_bulan_11 + rl_310_bulan_12 + ' +
            'rl_311 + ' +
            'rl_312_bulan_1 + rl_312_bulan_2 + rl_312_bulan_3 + rl_312_bulan_4 + rl_312_bulan_5 + rl_312_bulan_6 + rl_312_bulan_7 + rl_312_bulan_8 + rl_312_bulan_9 + rl_312_bulan_10 + rl_312_bulan_11 + rl_312_bulan_12 + ' +
            'rl_313 + ' +
            'rl_314_bulan_1 + rl_314_bulan_2 + rl_314_bulan_3 + rl_314_bulan_4 + rl_314_bulan_5 + rl_314_bulan_6 + rl_314_bulan_7 + rl_314_bulan_8 + rl_314_bulan_9 + rl_314_bulan_10 + rl_314_bulan_11 + rl_314_bulan_12 + ' +
            'rl_315 + rl_316 + rl_317 + rl_318 + rl_319 + ' +
            'rl_41_bulan_1 + rl_41_bulan_2 + rl_41_bulan_3 + rl_41_bulan_4 + rl_41_bulan_5 + rl_41_bulan_6 + rl_41_bulan_7 + rl_41_bulan_8 + rl_41_bulan_9 + rl_41_bulan_10 + rl_41_bulan_11 + rl_41_bulan_12 + ' +
            'rl_42_bulan_1 + rl_42_bulan_2 + rl_42_bulan_3 + rl_42_bulan_4 + rl_42_bulan_5 + rl_42_bulan_6 + rl_42_bulan_7 + rl_42_bulan_8 + rl_42_bulan_9 + rl_42_bulan_10 + rl_42_bulan_11 + rl_42_bulan_12 + ' +
            'rl_43_bulan_1 + rl_43_bulan_2 + rl_43_bulan_3 + rl_43_bulan_4 + rl_43_bulan_5 + rl_43_bulan_6 + rl_43_bulan_7 + rl_43_bulan_8 + rl_43_bulan_9 + rl_43_bulan_10 + rl_43_bulan_11 + rl_43_bulan_12 + ' +
            'rl_51_bulan_1 + rl_51_bulan_2 + rl_51_bulan_3 + rl_51_bulan_4 + rl_51_bulan_5 + rl_51_bulan_6 + rl_51_bulan_7 + rl_51_bulan_8 + rl_51_bulan_9 + rl_51_bulan_10 + rl_51_bulan_11 + rl_51_bulan_12 + ' +
            'rl_52_bulan_1 + rl_52_bulan_2 + rl_52_bulan_3 + rl_52_bulan_4 + rl_52_bulan_5 + rl_52_bulan_6 + rl_52_bulan_7 + rl_52_bulan_8 + rl_52_bulan_9 + rl_52_bulan_10 + rl_52_bulan_11 + rl_52_bulan_12 + ' +
            'rl_53_bulan_1 + rl_53_bulan_2 + rl_53_bulan_3 + rl_53_bulan_4 + rl_53_bulan_5 + rl_53_bulan_6 + rl_53_bulan_7 + rl_53_bulan_8 + rl_53_bulan_9 + rl_53_bulan_10 + rl_53_bulan_11 + rl_53_bulan_12 ' +
        ') * 100 / 223, 2) = 0 ' +
        'THEN 100 ' +
        'ELSE ROUND (( ' +
            'rl_31_bulan_1 + rl_31_bulan_2 + rl_31_bulan_3 + rl_31_bulan_4 + rl_31_bulan_5 + rl_31_bulan_6 + rl_31_bulan_7 + rl_31_bulan_8 + rl_31_bulan_9 + rl_31_bulan_10 + rl_31_bulan_11 + rl_31_bulan_12 + ' +
            'rl_32_bulan_1 + rl_32_bulan_2 + rl_32_bulan_3 + rl_32_bulan_4 + rl_32_bulan_5 + rl_32_bulan_6 + rl_32_bulan_7 + rl_32_bulan_8 + rl_32_bulan_9 + rl_32_bulan_10 + rl_32_bulan_11 + rl_32_bulan_12 + ' +
            'rl_33_bulan_1 + rl_33_bulan_2 + rl_33_bulan_3 + rl_33_bulan_4 + rl_33_bulan_5 + rl_33_bulan_6 + rl_33_bulan_7 + rl_33_bulan_8 + rl_33_bulan_9 + rl_33_bulan_10 + rl_33_bulan_11 + rl_33_bulan_12 + ' +
            'rl_34_bulan_1 + rl_34_bulan_2 + rl_34_bulan_3 + rl_34_bulan_4 + rl_34_bulan_5 + rl_34_bulan_6 + rl_34_bulan_7 + rl_34_bulan_8 + rl_34_bulan_9 + rl_34_bulan_10 + rl_34_bulan_11 + rl_34_bulan_12 + ' +
            'rl_35_bulan_1 + rl_35_bulan_2 + rl_35_bulan_3 + rl_35_bulan_4 + rl_35_bulan_5 + rl_35_bulan_6 + rl_35_bulan_7 + rl_35_bulan_8 + rl_35_bulan_9 + rl_35_bulan_10 + rl_35_bulan_11 + rl_35_bulan_12 + ' +
            'rl_36_bulan_1 + rl_36_bulan_2 + rl_36_bulan_3 + rl_36_bulan_4 + rl_36_bulan_5 + rl_36_bulan_6 + rl_36_bulan_7 + rl_36_bulan_8 + rl_36_bulan_9 + rl_36_bulan_10 + rl_36_bulan_11 + rl_36_bulan_12 + ' +
            'rl_37_bulan_1 + rl_37_bulan_2 + rl_37_bulan_3 + rl_37_bulan_4 + rl_37_bulan_5 + rl_37_bulan_6 + rl_37_bulan_7 + rl_37_bulan_8 + rl_37_bulan_9 + rl_37_bulan_10 + rl_37_bulan_11 + rl_37_bulan_12 + ' +
            'rl_38_bulan_1 + rl_38_bulan_2 + rl_38_bulan_3 + rl_38_bulan_4 + rl_38_bulan_5 + rl_38_bulan_6 + rl_38_bulan_7 + rl_38_bulan_8 + rl_38_bulan_9 + rl_38_bulan_10 + rl_38_bulan_11 + rl_38_bulan_12 + ' +
            'rl_39_bulan_1 + rl_39_bulan_2 + rl_39_bulan_3 + rl_39_bulan_4 + rl_39_bulan_5 + rl_39_bulan_6 + rl_39_bulan_7 + rl_39_bulan_8 + rl_39_bulan_9 + rl_39_bulan_10 + rl_39_bulan_11 + rl_39_bulan_12 + ' +
            'rl_310_bulan_1 + rl_310_bulan_2 + rl_310_bulan_3 + rl_310_bulan_4 + rl_310_bulan_5 + rl_310_bulan_6 + rl_310_bulan_7 + rl_310_bulan_8 + rl_310_bulan_9 + rl_310_bulan_10 + rl_310_bulan_11 + rl_310_bulan_12 + ' +
            'rl_311 + ' +
            'rl_312_bulan_1 + rl_312_bulan_2 + rl_312_bulan_3 + rl_312_bulan_4 + rl_312_bulan_5 + rl_312_bulan_6 + rl_312_bulan_7 + rl_312_bulan_8 + rl_312_bulan_9 + rl_312_bulan_10 + rl_312_bulan_11 + rl_312_bulan_12 + ' +
            'rl_313 + ' +
            'rl_314_bulan_1 + rl_314_bulan_2 + rl_314_bulan_3 + rl_314_bulan_4 + rl_314_bulan_5 + rl_314_bulan_6 + rl_314_bulan_7 + rl_314_bulan_8 + rl_314_bulan_9 + rl_314_bulan_10 + rl_314_bulan_11 + rl_314_bulan_12 + ' +
            'rl_315 + rl_316 + rl_317 + rl_318 + rl_319 + ' +
            'rl_41_bulan_1 + rl_41_bulan_2 + rl_41_bulan_3 + rl_41_bulan_4 + rl_41_bulan_5 + rl_41_bulan_6 + rl_41_bulan_7 + rl_41_bulan_8 + rl_41_bulan_9 + rl_41_bulan_10 + rl_41_bulan_11 + rl_41_bulan_12 + ' +
            'rl_42_bulan_1 + rl_42_bulan_2 + rl_42_bulan_3 + rl_42_bulan_4 + rl_42_bulan_5 + rl_42_bulan_6 + rl_42_bulan_7 + rl_42_bulan_8 + rl_42_bulan_9 + rl_42_bulan_10 + rl_42_bulan_11 + rl_42_bulan_12 + ' +
            'rl_43_bulan_1 + rl_43_bulan_2 + rl_43_bulan_3 + rl_43_bulan_4 + rl_43_bulan_5 + rl_43_bulan_6 + rl_43_bulan_7 + rl_43_bulan_8 + rl_43_bulan_9 + rl_43_bulan_10 + rl_43_bulan_11 + rl_43_bulan_12 + ' +
            'rl_51_bulan_1 + rl_51_bulan_2 + rl_51_bulan_3 + rl_51_bulan_4 + rl_51_bulan_5 + rl_51_bulan_6 + rl_51_bulan_7 + rl_51_bulan_8 + rl_51_bulan_9 + rl_51_bulan_10 + rl_51_bulan_11 + rl_51_bulan_12 + ' +
            'rl_52_bulan_1 + rl_52_bulan_2 + rl_52_bulan_3 + rl_52_bulan_4 + rl_52_bulan_5 + rl_52_bulan_6 + rl_52_bulan_7 + rl_52_bulan_8 + rl_52_bulan_9 + rl_52_bulan_10 + rl_52_bulan_11 + rl_52_bulan_12 + ' +
            'rl_53_bulan_1 + rl_53_bulan_2 + rl_53_bulan_3 + rl_53_bulan_4 + rl_53_bulan_5 + rl_53_bulan_6 + rl_53_bulan_7 + rl_53_bulan_8 + rl_53_bulan_9 + rl_53_bulan_10 + rl_53_bulan_11 + rl_53_bulan_12 ' +
        ') * 100 / 223, 2) ' +
        'END AS persentase_pengisian, ' +
        'rl_31_bulan_1, ' +
        'rl_31_bulan_2, ' +
        'rl_31_bulan_3, ' +
        'rl_31_bulan_4, ' +
        'rl_31_bulan_5, ' +
        'rl_31_bulan_6, ' +
        'rl_31_bulan_7, ' +
        'rl_31_bulan_8, ' +
        'rl_31_bulan_9, ' +
        'rl_31_bulan_10, ' +
        'rl_31_bulan_11, ' +
        'rl_31_bulan_12, '  +
        'rl_32_bulan_1, ' +
        'rl_32_bulan_2, ' +
        'rl_32_bulan_3, ' +
        'rl_32_bulan_4, ' +
        'rl_32_bulan_5, ' +
        'rl_32_bulan_6, ' +
        'rl_32_bulan_7, ' +
        'rl_32_bulan_8, ' +
        'rl_32_bulan_9, ' +
        'rl_32_bulan_10, ' +
        'rl_32_bulan_11, ' +
        'rl_32_bulan_12, '  +
        'rl_33_bulan_1, ' +
        'rl_33_bulan_2, ' +
        'rl_33_bulan_3, ' +
        'rl_33_bulan_4, ' +
        'rl_33_bulan_5, ' +
        'rl_33_bulan_6, ' +
        'rl_33_bulan_7, ' +
        'rl_33_bulan_8, ' +
        'rl_33_bulan_9, ' +
        'rl_33_bulan_10, ' +
        'rl_33_bulan_11, ' +
        'rl_33_bulan_12, '  +
        'rl_34_bulan_1, ' +
        'rl_34_bulan_2, ' +
        'rl_34_bulan_3, ' +
        'rl_34_bulan_4, ' +
        'rl_34_bulan_5, ' +
        'rl_34_bulan_6, ' +
        'rl_34_bulan_7, ' +
        'rl_34_bulan_8, ' +
        'rl_34_bulan_9, ' +
        'rl_34_bulan_10, ' +
        'rl_34_bulan_11, ' +
        'rl_34_bulan_12, '  +
        'rl_35_bulan_1, ' +
        'rl_35_bulan_2, ' +
        'rl_35_bulan_3, ' +
        'rl_35_bulan_4, ' +
        'rl_35_bulan_5, ' +
        'rl_35_bulan_6, ' +
        'rl_35_bulan_7, ' +
        'rl_35_bulan_8, ' +
        'rl_35_bulan_9, ' +
        'rl_35_bulan_10, ' +
        'rl_35_bulan_11, ' +
        'rl_35_bulan_12, '  +
        'rl_36_bulan_1, ' +
        'rl_36_bulan_2, ' +
        'rl_36_bulan_3, ' +
        'rl_36_bulan_4, ' +
        'rl_36_bulan_5, ' +
        'rl_36_bulan_6, ' +
        'rl_36_bulan_7, ' +
        'rl_36_bulan_8, ' +
        'rl_36_bulan_9, ' +
        'rl_36_bulan_10, ' +
        'rl_36_bulan_11, ' +
        'rl_36_bulan_12, '  +
        'rl_37_bulan_1, ' +
        'rl_37_bulan_2, ' +
        'rl_37_bulan_3, ' +
        'rl_37_bulan_4, ' +
        'rl_37_bulan_5, ' +
        'rl_37_bulan_6, ' +
        'rl_37_bulan_7, ' +
        'rl_37_bulan_8, ' +
        'rl_37_bulan_9, ' +
        'rl_37_bulan_10, ' +
        'rl_37_bulan_11, ' +
        'rl_37_bulan_12, '  +
        'rl_38_bulan_1, ' +
        'rl_38_bulan_2, ' +
        'rl_38_bulan_3, ' +
        'rl_38_bulan_4, ' +
        'rl_38_bulan_5, ' +
        'rl_38_bulan_6, ' +
        'rl_38_bulan_7, ' +
        'rl_38_bulan_8, ' +
        'rl_38_bulan_9, ' +
        'rl_38_bulan_10, ' +
        'rl_38_bulan_11, ' +
        'rl_38_bulan_12, '  +
        'rl_39_bulan_1, ' +
        'rl_39_bulan_2, ' +
        'rl_39_bulan_3, ' +
        'rl_39_bulan_4, ' +
        'rl_39_bulan_5, ' +
        'rl_39_bulan_6, ' +
        'rl_39_bulan_7, ' +
        'rl_39_bulan_8, ' +
        'rl_39_bulan_9, ' +
        'rl_39_bulan_10, ' +
        'rl_39_bulan_11, ' +
        'rl_39_bulan_12, '  +
        'rl_310_bulan_1, ' +
        'rl_310_bulan_2, ' +
        'rl_310_bulan_3, ' +
        'rl_310_bulan_4, ' +
        'rl_310_bulan_5, ' +
        'rl_310_bulan_6, ' +
        'rl_310_bulan_7, ' +
        'rl_310_bulan_8, ' +
        'rl_310_bulan_9, ' +
        'rl_310_bulan_10, ' +
        'rl_310_bulan_11, ' +
        'rl_310_bulan_12, '  +
        'rl_311, ' +
        'rl_312_bulan_1, ' +
        'rl_312_bulan_2, ' +
        'rl_312_bulan_3, ' +
        'rl_312_bulan_4, ' +
        'rl_312_bulan_5, ' +
        'rl_312_bulan_6, ' +
        'rl_312_bulan_7, ' +
        'rl_312_bulan_8, ' +
        'rl_312_bulan_9, ' +
        'rl_312_bulan_10, ' +
        'rl_312_bulan_11, ' +
        'rl_312_bulan_12, '  +
        'rl_313, ' +
        'rl_314_bulan_1, ' +
        'rl_314_bulan_2, ' +
        'rl_314_bulan_3, ' +
        'rl_314_bulan_4, ' +
        'rl_314_bulan_5, ' +
        'rl_314_bulan_6, ' +
        'rl_314_bulan_7, ' +
        'rl_314_bulan_8, ' +
        'rl_314_bulan_9, ' +
        'rl_314_bulan_10, ' +
        'rl_314_bulan_11, ' +
        'rl_314_bulan_12, '  +
        'rl_315, ' +
        'rl_316, ' +
        'rl_317, ' +
        'rl_318, ' +
        'rl_319, ' +
        'rl_41_bulan_1, ' +
        'rl_41_bulan_2, ' +
        'rl_41_bulan_3, ' +
        'rl_41_bulan_4, ' +
        'rl_41_bulan_5, ' +
        'rl_41_bulan_6, ' +
        'rl_41_bulan_7, ' +
        'rl_41_bulan_8, ' +
        'rl_41_bulan_9, ' +
        'rl_41_bulan_10, ' +
        'rl_41_bulan_11, ' +
        'rl_41_bulan_12, '  +
        'rl_42_bulan_1, ' +
        'rl_42_bulan_2, ' +
        'rl_42_bulan_3, ' +
        'rl_42_bulan_4, ' +
        'rl_42_bulan_5, ' +
        'rl_42_bulan_6, ' +
        'rl_42_bulan_7, ' +
        'rl_42_bulan_8, ' +
        'rl_42_bulan_9, ' +
        'rl_42_bulan_10, ' +
        'rl_42_bulan_11, ' +
        'rl_42_bulan_12, '  +
        'rl_43_bulan_1, ' +
        'rl_43_bulan_2, ' +
        'rl_43_bulan_3, ' +
        'rl_43_bulan_4, ' +
        'rl_43_bulan_5, ' +
        'rl_43_bulan_6, ' +
        'rl_43_bulan_7, ' +
        'rl_43_bulan_8, ' +
        'rl_43_bulan_9, ' +
        'rl_43_bulan_10, ' +
        'rl_43_bulan_11, ' +
        'rl_43_bulan_12, '  +
        'rl_51_bulan_1, ' +
        'rl_51_bulan_2, ' +
        'rl_51_bulan_3, ' +
        'rl_51_bulan_4, ' +
        'rl_51_bulan_5, ' +
        'rl_51_bulan_6, ' +
        'rl_51_bulan_7, ' +
        'rl_51_bulan_8, ' +
        'rl_51_bulan_9, ' +
        'rl_51_bulan_10, ' +
        'rl_51_bulan_11, ' +
        'rl_51_bulan_12, '  +
        'rl_52_bulan_1, ' +
        'rl_52_bulan_2, ' +
        'rl_52_bulan_3, ' +
        'rl_52_bulan_4, ' +
        'rl_52_bulan_5, ' +
        'rl_52_bulan_6, ' +
        'rl_52_bulan_7, ' +
        'rl_52_bulan_8, ' +
        'rl_52_bulan_9, ' +
        'rl_52_bulan_10, ' +
        'rl_52_bulan_11, ' +
        'rl_52_bulan_12, '  +
        'rl_53_bulan_1, ' +
        'rl_53_bulan_2, ' +
        'rl_53_bulan_3, ' +
        'rl_53_bulan_4, ' +
        'rl_53_bulan_5, ' +
        'rl_53_bulan_6, ' +
        'rl_53_bulan_7, ' +
        'rl_53_bulan_8, ' +
        'rl_53_bulan_9, ' +
        'rl_53_bulan_10, ' +
        'rl_53_bulan_11, ' +
        'rl_53_bulan_12, ' +
        'CASE ' +
        'WHEN ROUND (( ' +
            'rl_31_bulan_1 + rl_31_bulan_2 + rl_31_bulan_3 + rl_31_bulan_4 + rl_31_bulan_5 + rl_31_bulan_6 + rl_31_bulan_7 + rl_31_bulan_8 + rl_31_bulan_9 + rl_31_bulan_10 + rl_31_bulan_11 + rl_31_bulan_12 + ' +
            'rl_32_bulan_1 + rl_32_bulan_2 + rl_32_bulan_3 + rl_32_bulan_4 + rl_32_bulan_5 + rl_32_bulan_6 + rl_32_bulan_7 + rl_32_bulan_8 + rl_32_bulan_9 + rl_32_bulan_10 + rl_32_bulan_11 + rl_32_bulan_12 + ' +
            'rl_33_bulan_1 + rl_33_bulan_2 + rl_33_bulan_3 + rl_33_bulan_4 + rl_33_bulan_5 + rl_33_bulan_6 + rl_33_bulan_7 + rl_33_bulan_8 + rl_33_bulan_9 + rl_33_bulan_10 + rl_33_bulan_11 + rl_33_bulan_12 + ' +
            'rl_34_bulan_1 + rl_34_bulan_2 + rl_34_bulan_3 + rl_34_bulan_4 + rl_34_bulan_5 + rl_34_bulan_6 + rl_34_bulan_7 + rl_34_bulan_8 + rl_34_bulan_9 + rl_34_bulan_10 + rl_34_bulan_11 + rl_34_bulan_12 + ' +
            'rl_35_bulan_1 + rl_35_bulan_2 + rl_35_bulan_3 + rl_35_bulan_4 + rl_35_bulan_5 + rl_35_bulan_6 + rl_35_bulan_7 + rl_35_bulan_8 + rl_35_bulan_9 + rl_35_bulan_10 + rl_35_bulan_11 + rl_35_bulan_12 + ' +
            'rl_36_bulan_1 + rl_36_bulan_2 + rl_36_bulan_3 + rl_36_bulan_4 + rl_36_bulan_5 + rl_36_bulan_6 + rl_36_bulan_7 + rl_36_bulan_8 + rl_36_bulan_9 + rl_36_bulan_10 + rl_36_bulan_11 + rl_36_bulan_12 + ' +
            'rl_37_bulan_1 + rl_37_bulan_2 + rl_37_bulan_3 + rl_37_bulan_4 + rl_37_bulan_5 + rl_37_bulan_6 + rl_37_bulan_7 + rl_37_bulan_8 + rl_37_bulan_9 + rl_37_bulan_10 + rl_37_bulan_11 + rl_37_bulan_12 + ' +
            'rl_38_bulan_1 + rl_38_bulan_2 + rl_38_bulan_3 + rl_38_bulan_4 + rl_38_bulan_5 + rl_38_bulan_6 + rl_38_bulan_7 + rl_38_bulan_8 + rl_38_bulan_9 + rl_38_bulan_10 + rl_38_bulan_11 + rl_38_bulan_12 + ' +
            'rl_39_bulan_1 + rl_39_bulan_2 + rl_39_bulan_3 + rl_39_bulan_4 + rl_39_bulan_5 + rl_39_bulan_6 + rl_39_bulan_7 + rl_39_bulan_8 + rl_39_bulan_9 + rl_39_bulan_10 + rl_39_bulan_11 + rl_39_bulan_12 + ' +
            'rl_310_bulan_1 + rl_310_bulan_2 + rl_310_bulan_3 + rl_310_bulan_4 + rl_310_bulan_5 + rl_310_bulan_6 + rl_310_bulan_7 + rl_310_bulan_8 + rl_310_bulan_9 + rl_310_bulan_10 + rl_310_bulan_11 + rl_310_bulan_12 + ' +
            'rl_311 + ' +
            'rl_312_bulan_1 + rl_312_bulan_2 + rl_312_bulan_3 + rl_312_bulan_4 + rl_312_bulan_5 + rl_312_bulan_6 + rl_312_bulan_7 + rl_312_bulan_8 + rl_312_bulan_9 + rl_312_bulan_10 + rl_312_bulan_11 + rl_312_bulan_12 + ' +
            'rl_313 + ' +
            'rl_314_bulan_1 + rl_314_bulan_2 + rl_314_bulan_3 + rl_314_bulan_4 + rl_314_bulan_5 + rl_314_bulan_6 + rl_314_bulan_7 + rl_314_bulan_8 + rl_314_bulan_9 + rl_314_bulan_10 + rl_314_bulan_11 + rl_314_bulan_12 + ' +
            'rl_315 + rl_316 + rl_317 + rl_318 + rl_319 + ' +
            'rl_41_bulan_1 + rl_41_bulan_2 + rl_41_bulan_3 + rl_41_bulan_4 + rl_41_bulan_5 + rl_41_bulan_6 + rl_41_bulan_7 + rl_41_bulan_8 + rl_41_bulan_9 + rl_41_bulan_10 + rl_41_bulan_11 + rl_41_bulan_12 + ' +
            'rl_42_bulan_1 + rl_42_bulan_2 + rl_42_bulan_3 + rl_42_bulan_4 + rl_42_bulan_5 + rl_42_bulan_6 + rl_42_bulan_7 + rl_42_bulan_8 + rl_42_bulan_9 + rl_42_bulan_10 + rl_42_bulan_11 + rl_42_bulan_12 + ' +
            'rl_43_bulan_1 + rl_43_bulan_2 + rl_43_bulan_3 + rl_43_bulan_4 + rl_43_bulan_5 + rl_43_bulan_6 + rl_43_bulan_7 + rl_43_bulan_8 + rl_43_bulan_9 + rl_43_bulan_10 + rl_43_bulan_11 + rl_43_bulan_12 + ' +
            'rl_51_bulan_1 + rl_51_bulan_2 + rl_51_bulan_3 + rl_51_bulan_4 + rl_51_bulan_5 + rl_51_bulan_6 + rl_51_bulan_7 + rl_51_bulan_8 + rl_51_bulan_9 + rl_51_bulan_10 + rl_51_bulan_11 + rl_51_bulan_12 + ' +
            'rl_52_bulan_1 + rl_52_bulan_2 + rl_52_bulan_3 + rl_52_bulan_4 + rl_52_bulan_5 + rl_52_bulan_6 + rl_52_bulan_7 + rl_52_bulan_8 + rl_52_bulan_9 + rl_52_bulan_10 + rl_52_bulan_11 + rl_52_bulan_12 + ' +
            'rl_53_bulan_1 + rl_53_bulan_2 + rl_53_bulan_3 + rl_53_bulan_4 + rl_53_bulan_5 + rl_53_bulan_6 + rl_53_bulan_7 + rl_53_bulan_8 + rl_53_bulan_9 + rl_53_bulan_10 + rl_53_bulan_11 + rl_53_bulan_12 ' +
        ') * 100 / 223, 2) = 100 ' +
        'THEN 100 ' +
        'ELSE ROUND (( ' +
            'rl_31_bulan_1 + rl_31_bulan_2 + rl_31_bulan_3 + rl_31_bulan_4 + rl_31_bulan_5 + rl_31_bulan_6 + rl_31_bulan_7 + rl_31_bulan_8 + rl_31_bulan_9 + rl_31_bulan_10 + rl_31_bulan_11 + rl_31_bulan_12 + ' +
            'rl_32_bulan_1 + rl_32_bulan_2 + rl_32_bulan_3 + rl_32_bulan_4 + rl_32_bulan_5 + rl_32_bulan_6 + rl_32_bulan_7 + rl_32_bulan_8 + rl_32_bulan_9 + rl_32_bulan_10 + rl_32_bulan_11 + rl_32_bulan_12 + ' +
            'rl_33_bulan_1 + rl_33_bulan_2 + rl_33_bulan_3 + rl_33_bulan_4 + rl_33_bulan_5 + rl_33_bulan_6 + rl_33_bulan_7 + rl_33_bulan_8 + rl_33_bulan_9 + rl_33_bulan_10 + rl_33_bulan_11 + rl_33_bulan_12 + ' +
            'rl_34_bulan_1 + rl_34_bulan_2 + rl_34_bulan_3 + rl_34_bulan_4 + rl_34_bulan_5 + rl_34_bulan_6 + rl_34_bulan_7 + rl_34_bulan_8 + rl_34_bulan_9 + rl_34_bulan_10 + rl_34_bulan_11 + rl_34_bulan_12 + ' +
            'rl_35_bulan_1 + rl_35_bulan_2 + rl_35_bulan_3 + rl_35_bulan_4 + rl_35_bulan_5 + rl_35_bulan_6 + rl_35_bulan_7 + rl_35_bulan_8 + rl_35_bulan_9 + rl_35_bulan_10 + rl_35_bulan_11 + rl_35_bulan_12 + ' +
            'rl_36_bulan_1 + rl_36_bulan_2 + rl_36_bulan_3 + rl_36_bulan_4 + rl_36_bulan_5 + rl_36_bulan_6 + rl_36_bulan_7 + rl_36_bulan_8 + rl_36_bulan_9 + rl_36_bulan_10 + rl_36_bulan_11 + rl_36_bulan_12 + ' +
            'rl_37_bulan_1 + rl_37_bulan_2 + rl_37_bulan_3 + rl_37_bulan_4 + rl_37_bulan_5 + rl_37_bulan_6 + rl_37_bulan_7 + rl_37_bulan_8 + rl_37_bulan_9 + rl_37_bulan_10 + rl_37_bulan_11 + rl_37_bulan_12 + ' +
            'rl_38_bulan_1 + rl_38_bulan_2 + rl_38_bulan_3 + rl_38_bulan_4 + rl_38_bulan_5 + rl_38_bulan_6 + rl_38_bulan_7 + rl_38_bulan_8 + rl_38_bulan_9 + rl_38_bulan_10 + rl_38_bulan_11 + rl_38_bulan_12 + ' +
            'rl_39_bulan_1 + rl_39_bulan_2 + rl_39_bulan_3 + rl_39_bulan_4 + rl_39_bulan_5 + rl_39_bulan_6 + rl_39_bulan_7 + rl_39_bulan_8 + rl_39_bulan_9 + rl_39_bulan_10 + rl_39_bulan_11 + rl_39_bulan_12 + ' +
            'rl_310_bulan_1 + rl_310_bulan_2 + rl_310_bulan_3 + rl_310_bulan_4 + rl_310_bulan_5 + rl_310_bulan_6 + rl_310_bulan_7 + rl_310_bulan_8 + rl_310_bulan_9 + rl_310_bulan_10 + rl_310_bulan_11 + rl_310_bulan_12 + ' +
            'rl_311 + ' +
            'rl_312_bulan_1 + rl_312_bulan_2 + rl_312_bulan_3 + rl_312_bulan_4 + rl_312_bulan_5 + rl_312_bulan_6 + rl_312_bulan_7 + rl_312_bulan_8 + rl_312_bulan_9 + rl_312_bulan_10 + rl_312_bulan_11 + rl_312_bulan_12 + ' +
            'rl_313 + ' +
            'rl_314_bulan_1 + rl_314_bulan_2 + rl_314_bulan_3 + rl_314_bulan_4 + rl_314_bulan_5 + rl_314_bulan_6 + rl_314_bulan_7 + rl_314_bulan_8 + rl_314_bulan_9 + rl_314_bulan_10 + rl_314_bulan_11 + rl_314_bulan_12 + ' +
            'rl_315 + rl_316 + rl_317 + rl_318 + rl_319 + ' +
            'rl_41_bulan_1 + rl_41_bulan_2 + rl_41_bulan_3 + rl_41_bulan_4 + rl_41_bulan_5 + rl_41_bulan_6 + rl_41_bulan_7 + rl_41_bulan_8 + rl_41_bulan_9 + rl_41_bulan_10 + rl_41_bulan_11 + rl_41_bulan_12 + ' +
            'rl_42_bulan_1 + rl_42_bulan_2 + rl_42_bulan_3 + rl_42_bulan_4 + rl_42_bulan_5 + rl_42_bulan_6 + rl_42_bulan_7 + rl_42_bulan_8 + rl_42_bulan_9 + rl_42_bulan_10 + rl_42_bulan_11 + rl_42_bulan_12 + ' +
            'rl_43_bulan_1 + rl_43_bulan_2 + rl_43_bulan_3 + rl_43_bulan_4 + rl_43_bulan_5 + rl_43_bulan_6 + rl_43_bulan_7 + rl_43_bulan_8 + rl_43_bulan_9 + rl_43_bulan_10 + rl_43_bulan_11 + rl_43_bulan_12 + ' +
            'rl_51_bulan_1 + rl_51_bulan_2 + rl_51_bulan_3 + rl_51_bulan_4 + rl_51_bulan_5 + rl_51_bulan_6 + rl_51_bulan_7 + rl_51_bulan_8 + rl_51_bulan_9 + rl_51_bulan_10 + rl_51_bulan_11 + rl_51_bulan_12 + ' +
            'rl_52_bulan_1 + rl_52_bulan_2 + rl_52_bulan_3 + rl_52_bulan_4 + rl_52_bulan_5 + rl_52_bulan_6 + rl_52_bulan_7 + rl_52_bulan_8 + rl_52_bulan_9 + rl_52_bulan_10 + rl_52_bulan_11 + rl_52_bulan_12 + ' +
            'rl_53_bulan_1 + rl_53_bulan_2 + rl_53_bulan_3 + rl_53_bulan_4 + rl_53_bulan_5 + rl_53_bulan_6 + rl_53_bulan_7 + rl_53_bulan_8 + rl_53_bulan_9 + rl_53_bulan_10 + rl_53_bulan_11 + rl_53_bulan_12 ' +
        ') * 100 / 223, 2) ' +
        'END AS persentase_pengisian '
    
    const sqlFrom = 'FROM ' +
        'absensi INNER JOIN kab_kota ON kab_kota.id = absensi.kab_kota_id '

    const sqlWhere = 'WHERE '

    const sqlOrder = 'ORDER BY nama_rs'

    const filter = []
    const sqlFilterValue = []

    const provinsiId = req.query.provinsiId || null
    const kabKotaId = req.query.kabKotaId || null
    const namaRS = req.query.namaRS || null

    if (provinsiId != null) {
        filter.push("absensi.provinsi_id IN (?) ")
        sqlFilterValue.push(req.query.provinsiId)
    }

    if (kabKotaId != null) {
        filter.push("absensi.kab_kota_id IN (?) ")
        sqlFilterValue.push(req.query.kabKotaId)
    }

    if (namaRS != null) {
        filter.push("absensi.nama_rs like ?")
        sqlFilterValue.push('%'.concat(namaRS).concat('%'))
    }

    let sqlFilter = ''
    filter.forEach((value, index) => {
        if (index == 0) {
            sqlFilter = sqlWhere.concat(value)
        } else if (index > 0) {
            sqlFilter = sqlFilter.concat(' AND ').concat(value)
        }
    })

    const sql = sqlSelect.concat(sqlFrom).concat(sqlFilter).concat(sqlOrder)
    databaseSIRS.query(sql, {
        type: QueryTypes.SELECT,
        replacements: sqlFilterValue
    })
    .then((res) => {
        callback(null, res)
    })
    .catch((error) => {
        callback(error, null)
    })
}