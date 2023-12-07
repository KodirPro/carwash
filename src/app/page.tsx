import { Screen } from "@/components";
import data from "./test.json";

export default async function FetcStatic() {
  // const res = await fetch("http://localhost/kws/hs/Database/DB", {
  //   headers: {
  //     Authorization:
  //       "Basic " + Buffer.from("Администратор" + ":" + "").toString("base64"),
  //   },
  // });

  // const data = await res.json();

  const emptyModelList = data.map((item) => ({
    id: item.id,
    service: item.service,
    description: item.description,
    foto: item.foto,
    modelAuto: "",
    price: 0,
  }));

  const aa = {
    services: {
      service1: {
        photo: "data/image",
        description: "description",
      },
      service2: {
        photo: "data/image",
        description: "description",
      },
    },
    prices: {
      model1: {
        service1: "10",
        service2: "20",
        service3: "30",
      },
      model2: {
        service1: "10",
        service2: "20",
        service3: "30",
      },
    },
  };

  const ddd = { services: {}, prices: {} };

  for (const item of data) {
    const element = data;
    
  }
  const m = data.map((item) => {
    const a = {
      services: {
        [item.service]: {
          photo: item.foto,
          description: item.description,
        },
      },
      prices: {
        [item.dataPrice[0].modelAuto]: {
          [item.service]: item.dataPrice[0].price,
          [item.service]: item.dataPrice[1].price,
          [item.service]: item.dataPrice[2].price,
        },
      },
    };

    return a;
  });

  return <Screen data={data} emptyModelList={emptyModelList} />;
}
