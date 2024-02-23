export interface usersModel{
  id:number,
  email:string,
  username:string,
  password:string,
  name:fullName,
  adress:adress,
  geolocation:geolocation,
  phone:string
}
  export interface fullName
  {
      firstname:'John',
      lastname:'Doe'
  }
  export interface adress
  {
    city:string,
    street:string,
    number:number,
    zipcode:string,
    geolocation:geolocation
  }

  export interface geolocation
    {
        lat:string,
        long:string
  }
