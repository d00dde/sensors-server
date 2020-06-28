module.exports = {
 max_user_id: 3,
 max_sensor_id: 3,
 users: [
    {
      id: 1,
      email: 'd48564@gmail.com',
      name: 'John',
      role: 'master',
      password: '$2a$10$DhQAmnU6E4RcwgB/LkN3f.yBdaFZCsOEcl.SIjZnxiDhP5dHib/zK',
    },
    {
      id: 2,
      email: 'd48564@gmail.con',
      name: 'Bob',
      role: 'user',
      password: '$2a$10$DhQAmnU6E4RcwgB/LkN3f.yBdaFZCsOEcl.SIjZnxiDhP5dHib/zK',
    },
    {
      id: 3,
      email: 'd48564@gmail.co',
      name: 'Alice',
      role: 'admin',
      password: '$2a$10$DhQAmnU6E4RcwgB/LkN3f.yBdaFZCsOEcl.SIjZnxiDhP5dHib/zK',
    },
  ],
  sensors: [
  {
      _id: 1,
      description: 'TELEG_SENSOR',
      channels: [
        {channel: 'telegram', address: '@D00dde1'}
      ],
      systemID: '42',
      secret: '42',
      owner: 1,
      events: [
        {code:'404', message:'lol', date: +new Date('2017-12-18T03:23:00')}, 
        {code:'42', message:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem assumenda quae est molestiae eaque quasi? Ea aut culpa, laudantium veritatis!', date: +new Date('2019-10-18T03:08:00')},
        {code:'322', message:'pop', date: +new Date()},
        {code:'42', message:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem assumenda quae est molestiae eaque quasi? Ea aut culpa, laudantium veritatis!', date: +new Date('2019-07-18T03:08:00')},
      ],
    },
    {
      _id: 2,
      description: 'VIBER_SENSOR',
      channels: [
        {channel: 'viber', address: '+380972074557'}
      ],
      systemID: '423',
      secret: '42',
      owner: 1,
      events: [],
    },
    {
      _id: 3,
      description: 'LOL_SENSOR',
      channels: [],
      systemID: '424',
      secret: '42',
      owner: 2,
      events: [],
    },
  ],
}