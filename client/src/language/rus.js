import constants from '../constants';

const channels = constants.channelsRus;

export default {
  navbar: {
    login: 'Вход',
    logout: 'Выйти',
    register: 'Регистрация',
    sensors: 'Датчики',
    users: 'Пользователи',
  },
  usersList: {
    email: 'Email',
    name: 'Имя',
    role: 'Права',
    setRights: 'Изменить права доступа',
    deleteBtn: 'Удалить',
  },
  sensorsList: {
    addBtn: 'Добавить',
    noSensors: 'Сенсоров пока нет.',
    updateBtn: 'Изменить',
    deleteBtn: 'Удалить',
  },
  eventsList: {
    noEvents: 'У этого датчика нет событий',
    events: 'События',
    code: 'Код события',
    message: 'Сообщение',
    date: 'Дата и время',
  },

  register: {
    title: 'Регистрация',
    email: 'Email',
    emailPh: 'Введите email',
    name: 'Имя',
    namePh: 'Введите ваше имя',
    password: 'Пароль',
    passwordPh: 'Введите пароль',
    confirmPassword: 'Подтвердите пароль',
    confirmPasswordPh: 'Введите пароль ещё раз',
    regButton: 'Создать',
    messages: {
      emailNoValid: 'Введите корректный адрес email',
      nameNoValid: 'Введите имя',
      passwordNoValid: 'Пароль слишком короткий',
      passwordsNoEqual: 'Пароли не совпадают',
    },
  },
  login: {
    title: 'Вход',
    email: 'Email',
    emailPh: 'Введите email',
    password: 'Пароль',
    passwordPh: 'Введите пароль',
    loginButton: 'Войти',
    messages: {
      emailNoValid: 'Введите корректный адрес email',
      passwordNoValid: 'Пароль слишком короткий',
    },
  },
  addSensor: {
    title: 'Добавить датчик',
    description: 'Название',
    descriptionPh: 'Введите название датчика',
    systemID: 'ID датчика',
    systemIDPh: 'Введите ID датчика',
    secret: 'Секретный ключ датчика',
    secretPh: 'Введите секретный ключ',
    channels: channels,
    addButton: 'Добавить',
    messages: {
      descriptionIsEmpty: 'Название не должно быть пустым',
      systemIDNoValid: 'Введите корректный ID датчика',
      secretNoValid: 'Введите корректный секретный ключ',
      noChannels: 'Укажите хотя бы один канал связи',
      noValidChannelAddress: 'Укажите корректный адресс',
    },
  },
  updateSensor: {
    title: 'Обновить датчик',
    description: 'Название',
    descriptionPh: 'Введите название датчика',
    systemID: 'ID датчика',
    systemIDPh: 'Введите ID датчика',
    secret: 'Секретный ключ датчика',
    secretPh: 'Введите секретный ключ',
    channels: channels,
    updateButton: 'Сохранить',
    messages: {
      descriptionIsEmpty: 'Название не должно быть пустым',
      systemIDNoValid: 'Введите корректный ID датчика',
      secretNoValid: 'Введите корректный секретный ключ',
      noChannels: 'Укажите хотя бы один канал связи',
      noValidChannelAddress: 'Укажите корректный адресс',
    },
  },
  deleteSensor: {
    title: 'Удалить датчик?',
    yes: 'Да',
    no: 'Нет',
  },
  deleteUser: {
    title: 'Удалить пользователя?',
    yes: 'Да',
    no: 'Нет',
  },
  setRights: {
    title: 'Установить права пользователю.',
    setAdmin: 'Назначить админом',
    setUser: 'Назначить пользователем',
    cancel: 'Отмена',
  },
};
