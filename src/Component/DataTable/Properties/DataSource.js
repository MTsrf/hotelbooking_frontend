import moment from 'moment'


export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const Booked = ["Index", "Image", "Property Name", "Room Type", "Room count", "Customer Name", "Check-In Date", "Check-Out Date", "Booking Status", "Actions"]
export const CancelRow = ["Index", "Image", "Property Name", "Room Type", "Room count", "Customer Name", "Check-In Date", "Check-Out Date", "Booking Status"]

export const allHotel = ["index", "Image", "Property Name", "Property Number", "City", "Provider Name", "Provider Room Qty", "Actions"]

export const UserRow = ["Index", "Name", "Email", "Phone Number", "Actions"]
//   function getFullName(params) {
//     return `${params.row.property.property_name}`;
//     console.log(params.row.property.property_name);
//   }
function getFullName(params) {
  return (
    <img width="30px" src={params.row.room.images[0][0].url} />
  )
  console.log(params.row.room.images[0][0].url);
}
export const bookedColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 250,
    hide: true
  },
  {
    field: 'image',
    headerName: 'Image',
    width: 150,
    height: 150,
    //   editable: true,
    renderCell: getFullName,
    //   <img src={params.row.room.images[0].url} />, // renderCell will render the component
  },
  {
    field: "property",
    headerName: "Hotel Name",
    valueGetter: (params) => (params.row.property.property_name),
    width: 300,
  },
  {
    field: "type",
    headerName: "Room Types",
    valueGetter: (params) => (params.row.room.room_name),
    width: 150,
  },
  {
    field: "roomNumber",
    headerName: "Room Number",
    width: 150,
  },
  {
    field: "GuestName",
    headerName: "Customer Name",
    width: 150,
  },
  {
    field: "Date",
    headerName: "Check In Date",
    width: 150,
    valueGetter: (params) => (moment(params.row.Date.startDate).format("L"))
  },
  {
    field: "Dates",
    headerName: "Check In Out",
    width: 150,
    valueGetter: (params) => (moment(params.row.Date.endDate).format("L"))
  },
  {
    filed: 'status',
    headerName: 'Status Book',
    width: 150,
    valueGetter: (params) => (params.row.isBooked && "Upcoming")
  }
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];
