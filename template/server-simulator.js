const sexes = ['Male', 'Female', 'Non-binary', 'Not telling']

const locations = ['New York', 'New Delhi', 'Sheffield', 'Bielefeld']

const greetings = [
  'Hiya',
  'Whaddup?',
  'Someone in here?',
  'Yo',
  'Hi!',
  'Gooooood morning, Vietnam!',
]

const names = [
  'Jordanne',
  'Fabian',
  'Grace',
  'Talia',
  'Lennox',
  'Khalid',
  'Nell',
  'Yasmine',
  'Norman',
  'Effie',
  'Kimberly',
  'Mae',
  'Thomas',
  'Emily',
  'Aaron',
  'Theodore',
  'Leeroy',
]

const nameSuffixes = ['1993', 'xXx', '1337', '69', '420', '✨', '<3']

// Are those actually versb? I have no idea…
const messageVerbs = ['wants', 'needs', 'is allowed']

const messageDelimiters = ['with', 'without', 'beside']

const activities = [
  'clean',
  'dance',
  'watch TV',
  'sleep in',
  'stay awake',
  'sing',
  'mow the lawn',
  'run away',
  'read',
  'chill out',
  'jog',
  'go scooba diving',
  'code',
]

const messageEmoji = ['', ':)', ':(', ':P', ':D', '8)']

class ChatServerInterface {
  constructor() {
    // eslint-disable-next-line no-undef
    if (this === window) {
      throw new Error()
    }

    let observers = []

    this.registerObserver = (eventName, observer) => observers.push({ [eventName]: observer })

    this.removeObserver = (eventName, observer) =>
      (observers = observers.filter((o) => o[eventName] !== observer))

    this.sendMessage = (text) => notifyObservers('onMessage', 'Myself', text)

    this.sendPrivateMessage = (receiverName, text) => {
      notifyObservers('onPrivateMessage', 'Myself', receiverName, text)

      // eslint-disable-next-line no-undef
      window.setTimeout(function () {
        notifyObservers('onPrivateMessage', receiverName, 'Myself', getRandomText())
      }, 1000)

      if (Math.random() < 0.5) {
        // eslint-disable-next-line no-undef
        window.setTimeout(() => {
          notifyObservers('onPrivateMessage', receiverName, 'Myself', getRandomText())
        }, 5000)
      }
    }

    this.requestProfileInformation = function (username, callback) {
      // eslint-disable-next-line no-undef
      setTimeout(() => {
        const profileInfo = getRandomProfileInfo(username)
        callback(profileInfo)
      }, 200)
    }

    /**
     * @param {string} methodName
     */
    function notifyObservers(methodName) {
      const args = []

      Array.prototype.push.apply(args, arguments)

      args.shift()

      observers.forEach((observer) => {
        if (!observer || !observer[methodName]) {
          return
        }

        try {
          observer[methodName].apply(null, args)
        } catch (e) {
          // eslint-disable-next-line no-undef
          console.log('Error: ' + e)
        }
      })
    }

    /**
     * Not actually a cron job, but you get the idea…
     * @returns void
     */
    function cronJob() {
      doRandom(0.3, () => {
        notifyObservers('onMessage', getRandomName(), getRandomText())
      })

      doRandom(0.15, () => {
        notifyObservers('onPrivateMessage', getRandomName(), 'Myself', getRandomText())
      })

      doRandom(0.2, () => {
        notifyObservers('onUserJoined', getRandomName())
        notifyObservers('onMessage', getRandomName(), oneOf(...greetings))
      })

      doRandom(0.8, () => {
        notifyObservers('onUserLeft', getRandomName())
      })
    }

    /**
     *
     * @param {number} prob
     * @param {(...unknown) => unknown} callback
     */
    function doRandom(prob, callback) {
      if (Math.random() < prob) {
        try {
          callback()
        } catch (err) {
          // eslint-disable-next-line no-undef
          console.log(err)
        }
      }
    }

    /**
     * Quite self explanatory
     *
     * @param {string} username
     * @returns UserObject
     */
    function getRandomProfileInfo(username) {
      const sex = oneOf(...sexes)
      const age = (Math.random() * 50 + 14) & 0xffff
      const location = oneOf(...locations)
      const zipCode = (Math.random() * 80000 + 10000) & 0xfffff

      return {
        username,
        age,
        sex,
        location,
        zipCode,
      }
    }

    /**
     * Generates a random name from a few predetermined, randomly (https://www.name-generator.org.uk/quick/) generated names and a couple pre and suffixes to give it more ✨ personality ✨
     * @returns string
     */
    function getRandomName() {
      const prefix = oneOf(...nameSuffixes)
      const name = oneOf(...names)
      const suffix = oneOf(...nameSuffixes)

      return `${prefix}${name}${suffix}`
    }

    /**
     * Generates some kind of quirky soulless text reminiscent of some low life IRC chat back in the day or whatever
     * @returns string
     */
    function getRandomText() {
      const activity = oneOf(...activities)
      const delimiter = oneOf(...messageDelimiters)
      const emoji = oneOf(...messageEmoji)
      const name = getRandomName()
      const secondName = getRandomName()
      const verb = oneOf(...messageVerbs)

      const message = `${name} ${verb} to ${activity} ${delimiter} ${secondName} ${emoji}`

      return message
    }

    /**
     * @param  {...string} args
     * @returns
     */
    function oneOf(...args) {
      return args[(args.length * Math.random()) & 0xffff]
    }

    // eslint-disable-next-line no-undef
    window.setInterval(cronJob, 750)
  }
}

// eslint-disable-next-line no-undef
window.serverInterface = new ChatServerInterface()
