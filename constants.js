import BANNER_PLAYERA from "./assets/Banner.png";
import LOGO_COMPANY from "./assets/Logo.png";
import NAME_COMPANY_IMG from "./assets/Company_name.png";
import PRODUCTO_1 from "./assets/Producto_1.png";
import PRODUCTO_2 from "./assets/Producto_2.jpeg";
import PRODUCTO_3 from "./assets/Producto_3.jpeg";
import PRODUCTO_4 from "./assets/Producto_4.jpeg";

export const LOGO = LOGO_COMPANY.src;
export const NAME_COMPANY = "Crazy Shirts UMB";
export const NAME_COMPANY_IMAGE = NAME_COMPANY_IMG.src;
export const BANNER_HOME = BANNER_PLAYERA.src;

export const BANNER_CATEGORY = [
  {
    banner:
      "https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Mujeres",
    direction: "/products/women",
  },
  {
    banner:
      "https://images.pexels.com/photos/1496647/pexels-photo-1496647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Hombres",
    direction: "/products/men",
  },
  //   {
  //     banner:
  //       "https://images.pexels.com/photos/1650093/pexels-photo-1650093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //     title: "Niños",
  //     direction: "/products/kids",
  //   },
  //   {
  //     banner:
  //       "https://images.pexels.com/photos/5704850/pexels-photo-5704850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //     title: "Accesorios",
  //     direction: "/products/accessories",
  //   },
];

export const PRODUCTS = [
  {
    id: 1,
    cover: [PRODUCTO_1.src],
    name: "Playera negra - MADE IN UMB",
    price: 150,
    description: `Luce con orgullo tu identidad universitaria con esta playera negra unisex de la Universidad Mexiquense. Con un diseño minimalista y atemporal, esta playera presenta la frase "MADE IN UMB", resaltando tu conexión con la comunidad universitaria. Fabricada con materiales de alta calidad para brindar comodidad y durabilidad, es ideal para el día a día, eventos universitarios o simplemente para mostrar tu espíritu UMB. Disponible exclusivamente en la tienda ${NAME_COMPANY}. ¡Hazla tuya y representa con estilo!`,
    category: ["men", "women"],
    direction: "/products/1",
    reviewCount: 142,
    quantity: 0,
    isFavorite: false,
  },
  {
    id: 2,
    cover: [PRODUCTO_2.src],
    name: "Playera blanca - Colibrí UMB ARTE",
    price: 150,
    description: `Demuestra tu orgullo universitario con esta playera blanca oficial de la Universidad Mexiquense (UMB). En el frente, luce el logo de la UMB, símbolo de excelencia académica, y en la parte trasera, un colibrí, la emblemática mascota de la universidad, representando energía, determinación y libertad. Confeccionada con materiales de alta calidad, esta playera unisex ofrece comodidad y estilo, ideal para el día a día o para cualquier ocasión en la que quieras llevar contigo el espíritu de la UMB. Disponible exclusivamente en ${NAME_COMPANY}. ¡Llévala y sé parte del orgullo UMB!
      `,
    category: ["men", "women"],
    direction: "/products/2",
    reviewCount: 100,
    quantity: 0,
    isFavorite: false,
  },
  {
    id: 3,
    cover: [PRODUCTO_3],
    name: "Playera blanca - Colibrí UMB",
    price: 150,
    description: `Lleva contigo el espíritu de la Universidad Mexiquense (UMB) con esta playera blanca unisex, diseñada especialmente para representar orgullo y pertenencia. En el frente, destaca el logo oficial de la UMB, mientras que en la parte trasera se encuentra un diseño exclusivo del colibrí, símbolo de energía, determinación y libertad. Confeccionada con materiales de alta calidad, esta playera es perfecta para el día a día, eventos universitarios o simplemente para demostrar tu identidad como parte de la comunidad UMB. Disponible solo en la tienda ${NAME_COMPANY}. ¡Consigue la tuya y muestra tu orgullo UMB con estilo!`,
    category: ["men", "women"],
    direction: "/products/3",
    reviewCount: 60,
    quantity: 0,
    isFavorite: false,
  },
  {
    id: 4,
    cover: [PRODUCTO_4],
    name: "Playera blanca - logo UMB",
    price: 150,
    description: `Luce con orgullo el logo oficial de la Universidad Mexiquense (UMB) con esta playera blanca unisex. Su diseño minimalista y elegante, con el logo en el pecho, la convierte en una prenda versátil y perfecta para cualquier ocasión. Fabricada con materiales de alta calidad, ofrece comodidad y durabilidad, ideal para estudiantes, egresados y todos los que forman parte de la comunidad UMB. Disponible exclusivamente en la tienda ${NAME_COMPANY}. ¡Hazla tuya y representa con orgullo!`,
    category: ["men", "women"],
    direction: "/products/4",
    reviewCount: 20,
    quantity: 0,
    isFavorite: false,
  },
];
