import { RLTigaTitikDelapanPemeriksaan, RLTigaTitikDelapanPemeriksaanGroup, RLTigaTitikDelapanPemeriksaanGroupHeader } from '../models/RLTigaTitikDelapanPemeriksaanModel.js';

export const getDataPemeriksaanRlTigaTitikDelapan = (req, res) => {
    RLTigaTitikDelapanPemeriksaan.findAll({
        attributes: ['id','no','nama'],
        include:
        {
            model: RLTigaTitikDelapanPemeriksaanGroup,
        },
    })
    .then((results) => {
        res.status(200).send({
            status: true,
            message: "data found",
            data: results
        })
    })
    .catch((err) => {
        res.status(422).send({
            status: false,
            message: err
        })
        return
    })
}

export const getDataPemeriksaanDetailRlTigaTitikDelapan = (req, res) => {
    RLTigaTitikDelapanPemeriksaan.findAll({
        attributes: ['id','no','nama'],
        include:[
            {
                model: RLTigaTitikDelapanPemeriksaanGroup,
                include: [
                    {
                        model: RLTigaTitikDelapanPemeriksaanGroupHeader,
                    },
                ],
            },
        ],
        order: [['id', 'ASC']], // Ordering by the id of RLTigaTitikDelapanPemeriksaan
    })
    .then((results) => {
        const transformedData = results.map((item) => {
            const group = item.rl_tiga_titik_delapan_group_pemeriksaan;
            const header = group.rl_tiga_titik_delapan_group_pemeriksaan_header;

            // let dt = {
            //     id: item.id,
            //     groupId: header.id,
            //     groupNama: header.nama,
            //     subGroupId: group.id,
            //     subGroupNo: group.no,
            //     subGroupNama: group.nama,
            //     jenisPemeriksaanId: item.id,
            //     jenisPemeriksaanNo: item.no,
            //     jenisPemeriksaanNama: item.nama      
            // }

            return {
                id: item.id,
                groupId: header.id,
                groupNama: header.nama,
                subGroupId: group.id,
                subGroupNo: group.no,
                subGroupNama: group.nama,
                jenisPemeriksaanId: item.id,
                jenisPemeriksaanNo: item.no,
                jenisPemeriksaanNama: item.nama   ,
                jumlahLaki: 0,
                jumlahPerempuan: 0,
                rataLaki: 0,
                rataPerempuan: 0,
                disabledInput: true,
                checked: false,   
            }
        });


        let subGroups = [];
      transformedData.reduce(function (res, value) {
        if (!res[value.subGroupId]) {
          res[value.subGroupId] = {
            groupId: value.groupId,
            groupNama: value.groupNama,
            subGroupId: value.subGroupId,
            subGroupNo: value.subGroupNo,
            subGroupNama: value.subGroupNama,
          };
          subGroups.push(res[value.subGroupId]);
        }
        return res;
      }, {});

      let groups = [];
      subGroups.reduce(function (res, value) {
        if (!res[value.groupId]) {
          res[value.groupId] = {
            groupId: value.groupId,
            groupNama: value.groupNama,
          };
          groups.push(res[value.groupId]);
        }
        return res;
      }, {});

      let satu = [];
      let dua = [];

      subGroups.forEach((element2) => {
        const filterData2 = transformedData.filter((value2, index2) => {
          return value2.subGroupId === element2.subGroupId;
        });
        dua.push({
          groupId: element2.groupId,
          subGroupId: element2.subGroupId,
          subGroupNo: element2.subGroupNo,
          subGroupNama: element2.subGroupNama,
          pemeriksaan: filterData2,
        });
      });

      groups.forEach((element) => {
        const filterData = dua.filter((value, index) => {
          return value.groupId === element.groupId;
        });
        satu.push({
          groupId: element.groupId,
          groupNama: element.groupNama,
          details: filterData,
        });
      });
      console.log("tes")
      console.log(satu)

        res.status(200).send({
            status: true,
            message: "data found",
            data: satu
        })
    })
    .catch((err) => {
        console.log(err)
        res.status(422).send({
            status: false,
            message: err
        })
        return
    })
}
