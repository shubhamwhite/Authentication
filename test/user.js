import User from '../models/user.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../middleware/userAuth.js'
import { Sequelize } from 'sequelize'

const data = 
  [
    {
      'fName': 'Takashi',
      'lName': 'Suzuki',
      'email': 'takashi.suzuki@example.com',
      'gmail_id': '123',
      'role': 'driver',
      'password': 'Takashi@123'
    },
    {
      'fName': 'Priya',
      'lName': 'Patel',
      'email': 'priya.patel@example.com',
      'gmail_id': '4587',
      'role': 'driver',
      'password': 'Priya@123'
    },
    {
      'fName': 'Rajendra',
      'lName': 'Kumar',
      'email': 'rajendra.kumar@example.com',
      'gmail_id': '54',
      'role': 'user',
      'password': 'Rajendra@123'
    },
    {
      'fName': 'Yuki',
      'lName': 'Tanaka',
      'email': 'yuki.tanaka@example.com',
      'gmail_id': '987',
      'role': 'driver',
      'password': 'Yuki@123'
    },
    {
      'fName': 'Amit',
      'lName': 'Sharma',
      'email': 'amit.sharma@example.com',
      'gmail_id': '32',
      'role': 'user',
      'password': 'Amit@123'
    },
    {
      'fName': 'Sachiko',
      'lName': 'Yamamoto',
      'email': 'sachiko.yamamoto@example.com',
      'gmail_id': '675',
      'role': 'admin',
      'password': 'Sachiko@123'
    },
    {
      'fName': 'Ashok',
      'lName': 'Rao',
      'email': 'ashok.rao@example.com',
      'gmail_id': '865',
      'role': 'user',
      'password': 'Ashok@123'
    },
    {
      'fName': 'Mina',
      'lName': 'Nagasaki',
      'email': 'mina.nagasaki@example.com',
      'gmail_id': '24',
      'role': 'driver',
      'password': 'Mina@123'
    },
    {
      'fName': 'Manoj',
      'lName': 'Chatterjee',
      'email': 'manoj.chatterjee@example.com',
      'gmail_id': '1234',
      'role': 'user',
      'password': 'Manoj@123'
    },
    {
      'fName': 'Sachin',
      'lName': 'Mehta',
      'email': 'sachin.mehta@example.com',
      'gmail_id': '543',
      'role': 'user',
      'password': 'Sachin@123'
    },
    {
      'fName': 'Kana',
      'lName': 'Kawasaki',
      'email': 'kana.kawasaki@example.com',
      'gmail_id': '78',
      'role': 'user',
      'password': 'Kana@123'
    },
    {
      'fName': 'Ravi',
      'lName': 'Verma',
      'email': 'ravi.verma@example.com',
      'gmail_id': '876',
      'role': 'driver',
      'password': 'Ravi@123'
    },
    {
      'fName': 'Priyanka',
      'lName': 'Shah',
      'email': 'priyanka.shah@example.com',
      'gmail_id': '456',
      'role': 'user',
      'password': 'Priyanka@123'
    },
    {
      'fName': 'Hiroshi',
      'lName': 'Nakamura',
      'email': 'hiroshi.nakamura@example.com',
      'gmail_id': '34',
      'role': 'driver',
      'password': 'Hiroshi@123'
    },
    {
      'fName': 'Anil',
      'lName': 'Nair',
      'email': 'anil.nair@example.com',
      'gmail_id': '4567',
      'role': 'user',
      'password': 'Anil@123'
    },
    {
      'fName': 'Yoko',
      'lName': 'Jain',
      'email': 'yoko.jain@example.com',
      'gmail_id': '9876',
      'role': 'user',
      'password': 'Yoko@123'
    },
    {
      'fName': 'Shinya',
      'lName': 'Mishra',
      'email': 'shinya.mishra@example.com',
      'gmail_id': '45',
      'role': 'user',
      'password': 'Shinya@123'
    },
    {
      'fName': 'Preeti',
      'lName': 'Chauhan',
      'email': 'preeti.chauhan@example.com',
      'gmail_id': '789',
      'role': 'driver',
      'password': 'Preeti@123'
    },
    {
      'fName': 'Akiko',
      'lName': 'Iyer',
      'email': 'akiko.iyer@example.com',
      'gmail_id': '2345',
      'role': 'user',
      'password': 'Akiko@123'
    },
    {
      'fName': 'David',
      'lName': 'Khan',
      'email': 'david.khan@example.com',
      'gmail_id': '8765',
      'role': 'driver',
      'password': 'David@123'
    },
    {
      'fName': 'Sachin',
      'lName': 'Srinivasan',
      'email': 'sachin.srinivasan@example.com',
      'gmail_id': '45678',
      'role': 'user',
      'password': 'Sachin@123'
    },
    {
      'fName': 'Akira',
      'lName': 'Kobayashi',
      'email': 'akira.kobayashi@example.com',
      'gmail_id': '654',
      'role': 'user',
      'password': 'Akira@123'
    },
    {
      'fName': 'Nina',
      'lName': 'Das',
      'email': 'nina.das@example.com',
      'gmail_id': '234',
      'role': 'user',
      'password': 'Nina@123'
    },
    {
      'fName': 'Kumar',
      'lName': 'Raj',
      'email': 'kumar.raj@example.com',
      'gmail_id': '999',
      'role': 'driver',
      'password': 'Kumar@123'
    },
    {
      'fName': 'Manju',
      'lName': 'Roy',
      'email': 'manju.roy@example.com',
      'gmail_id': '555',
      'role': 'user',
      'password': 'Manju@123'
    },
    {
      'fName': 'Haruki',
      'lName': 'Mukherjee',
      'email': 'haruki.mukherjee@example.com',
      'gmail_id': '111',
      'role': 'user',
      'password': 'Haruki@123'
    },
    {
      'fName': 'Sanjeev',
      'lName': 'Sen',
      'email': 'sanjeev.sen@example.com',
      'gmail_id': '6543',
      'role': 'driver',
      'password': 'Sanjeev@123'
    },
    {
      'fName': 'Rina',
      'lName': 'Gupta',
      'email': 'rina.gupta@example.com',
      'gmail_id': '333',
      'role': 'user',
      'password': 'Rina@123'
    },
    {
      'fName': 'Noboru',
      'lName': 'Ibrahim',
      'email': 'noboru.ibrahim@example.com',
      'gmail_id': '2222',
      'role': 'user',
      'password': 'Noboru@123'
    },
    {
      'fName': 'Tetsuya',
      'lName': 'Kaur',
      'email': 'tetsuya.kaur@example.com',
      'gmail_id': '1',
      'role': 'user',
      'password': 'Tetsuya@123'
    },
    {
      'fName': 'Ayesha',
      'lName': 'Dasgupta',
      'email': 'ayesha.dasgupta@example.com',
      'gmail_id': '100',
      'role': 'user',
      'password': 'Ayesha@123'
    },
    {
      'fName': 'Hiroshi',
      'lName': 'Thakur',
      'email': 'hiroshi.thakur@example.com',
      'gmail_id': '876',
      'role': 'driver',
      'password': 'Hiroshi@123'
    },
    {
      'fName': 'Sunita',
      'lName': 'Choudhury',
      'email': 'sunita.choudhury@example.com',
      'gmail_id': '4321',
      'role': 'user',
      'password': 'Sunita@123'
    },
    {
      'fName': 'Masato',
      'lName': 'Reddy',
      'email': 'masato.reddy@example.com',
      'gmail_id': '777',
      'role': 'user',
      'password': 'Masato@123'
    },
    {
      'fName': 'Lakshmi',
      'lName': 'Singh',
      'email': 'lakshmi.singh@example.com',
      'gmail_id': '5000',
      'role': 'user',
      'password': 'Lakshmi@123'
    },
    {
      'fName': 'Nori',
      'lName': 'Shukla',
      'email': 'nori.shukla@example.com',
      'gmail_id': '567',
      'role': 'driver',
      'password': 'Nori@123'
    },
    {
      'fName': 'Sarita',
      'lName': 'Nanda',
      'email': 'sarita.nanda@example.com',
      'gmail_id': '300',
      'role': 'user',
      'password': 'Sarita@123'
    },
    {
      'fName': 'Yoshio',
      'lName': 'Sinha',
      'email': 'yoshio.sinha@example.com',
      'gmail_id': '7890',
      'role': 'user',
      'password': 'Yoshio@123'
    },
    {
      'fName': 'Rakesh',
      'lName': 'Venkatesh',
      'email': 'rakesh.venkatesh@example.com',
      'gmail_id': '98765',
      'role': 'driver',
      'password': 'Rakesh@123'
    },
    {
      'fName': 'Rina',
      'lName': 'Goswami',
      'email': 'rina.goswami@example.com',
      'gmail_id': '3210',
      'role': 'user',
      'password': 'Rina@123'
    },
    {
      'fName': 'Takayuki',
      'lName': 'Ahmed',
      'email': 'takayuki.ahmed@example.com',
      'gmail_id': '987',
      'role': 'user',
      'password': 'Takayuki@123'
    },
    {
      'fName': 'Harumi',
      'lName': 'Ishikawa',
      'email': 'harumi.ishikawa@example.com',
      'gmail_id': '9999',
      'role': 'user',
      'password': 'Harumi@123'
    },
    {
      'fName': 'Rajiv',
      'lName': 'Banerjee',
      'email': 'rajiv.banerjee@example.com',
      'gmail_id': '101',
      'role': 'driver',
      'password': 'Rajiv@123'
    },
    {
      'fName': 'Aruna',
      'lName': 'Jha',
      'email': 'aruna.jha@example.com',
      'gmail_id': '8765',
      'role': 'user',
      'password': 'Aruna@123'
    },
    {
      'fName': 'Hideki',
      'lName': 'Rathore',
      'email': 'hideki.rathore@example.com',
      'gmail_id': '5555',
      'role': 'user',
      'password': 'Hideki@123'
    },
    {
      'fName': 'Ramesh',
      'lName': 'Malik',
      'email': 'ramesh.malik@example.com',
      'gmail_id': '45',
      'role': 'user',
      'password': 'Ramesh@123'
    },
    {
      'fName': 'Asuka',
      'lName': 'Rai',
      'email': 'asuka.rai@example.com',
      'gmail_id': '3',
      'role': 'driver',
      'password': 'Asuka@123'
    },
    {
      'fName': 'Vinod',
      'lName': 'Kapoor',
      'email': 'vinod.kapoor@example.com',
      'gmail_id': '23456',
      'role': 'user',
      'password': 'Vinod@123'
    },
    {
      'fName': 'Ayesha',
      'lName': 'Shukla',
      'email': 'ayesha.shukla@example.com',
      'gmail_id': '1010',
      'role': 'user',
      'password': 'Ayesha@123'
    },
    {
      'fName': 'Kazuki',
      'lName': 'Krishnan',
      'email': 'kazuki.krishnan@example.com',
      'gmail_id': '10101',
      'role': 'user',
      'password': 'Kazuki@123'
    },
    {
      'fName': 'Mala',
      'lName': 'Bose',
      'email': 'mala.bose@example.com',
      'gmail_id': '8888',
      'role': 'user',
      'password': 'Mala@123'
    },
    {
      'fName': 'Kishore',
      'lName': 'Ghosh',
      'email': 'kishore.ghosh@example.com',
      'gmail_id': '4444',
      'role': 'driver',
      'password': 'Kishore@123'
    },
    {
      'fName': 'Yuki',
      'lName': 'Bhattacharya',
      'email': 'yuki.bhattacharya@example.com',
      'gmail_id': '65432',
      'role': 'user',
      'password': 'Yuki@123'
    },
    {
      'fName': 'Subhash',
      'lName': 'Vaidya',
      'email': 'subhash.vaidya@example.com',
      'gmail_id': '55555',
      'role': 'user',
      'password': 'Subhash@123'
    },
    {
      'fName': 'Kyoko',
      'lName': 'Das',
      'email': 'kyoko.das@example.com',
      'gmail_id': '12345',
      'role': 'driver',
      'password': 'Kyoko@123'
    },
    {
      'fName': 'Yoshiko',
      'lName': 'Menon',
      'email': 'yoshiko.menon@example.com',
      'gmail_id': '99999',
      'role': 'user',
      'password': 'Yoshiko@123'
    },
    {
      'fName': 'Shinji',
      'lName': 'Raju',
      'email': 'shinji.raju@example.com',
      'gmail_id': '77777',
      'role': 'user',
      'password': 'Shinji@123'
    },
    {
      'fName': 'Haruko',
      'lName': 'Rao',
      'email': 'haruko.rao@example.com',
      'gmail_id': '11',
      'role': 'driver',
      'password': 'Haruko@123'
    },
    {
      'fName': 'Rakesh',
      'lName': 'Menon',
      'email': 'rakesh.menon@example.com',
      'gmail_id': '56789',
      'role': 'driver',
      'password': 'Rakesh@123'
    },
    {
      'fName': 'Rina',
      'lName': 'Sharma',
      'email': 'rina.sharma@example.com',
      'gmail_id': '5555',
      'role': 'driver',
      'password': 'Rina@123'
    },
    {
      'fName': 'Hiroshi',
      'lName': 'Das',
      'email': 'hiroshi.das@example.com',
      'gmail_id': '98765',
      'role': 'user',
      'password': 'Hiroshi@123'
    },
    {
      'fName': 'Sunita',
      'lName': 'Gupta',
      'email': 'sunita.gupta@example.com',
      'gmail_id': '33333',
      'role': 'driver',
      'password': 'Sunita@123'
    },
    {
      'fName': 'Masato',
      'lName': 'Nair',
      'email': 'masato.nair@example.com',
      'gmail_id': '22222',
      'role': 'driver',
      'password': 'Masato@123'
    },
    {
      'fName': 'Lakshmi',
      'lName': 'Chatterjee',
      'email': 'lakshmi.chatterjee@example.com',
      'gmail_id': '10000',
      'role': 'user',
      'password': 'Lakshmi@123'
    },
    {
      'fName': 'Nori',
      'lName': 'Mehta',
      'email': 'nori.mehta@example.com',
      'gmail_id': '65432',
      'role': 'driver',
      'password': 'Nori@123'
    },
    {
      'fName': 'Sarita',
      'lName': 'Khan',
      'email': 'sarita.khan@example.com',
      'gmail_id': '321',
      'role': 'driver',
      'password': 'Sarita@123'
    },
    {
      'fName': 'Yoshio',
      'lName': 'Srinivasan',
      'email': 'yoshio.srinivasan@example.com',
      'gmail_id': '7890',
      'role': 'driver',
      'password': 'Yoshio@123'
    },
    {
      'fName': 'Rakesh',
      'lName': 'Kobayashi',
      'email': 'rakesh.kobayashi@example.com',
      'gmail_id': '6543',
      'role': 'user',
      'password': 'Rakesh@123'
    },
    {
      'fName': 'Aruna',
      'lName': 'Dasgupta',
      'email': 'aruna.dasgupta@example.com',
      'gmail_id': '9876',
      'role': 'driver',
      'password': 'Aruna@123'
    },
    {
      'fName': 'Hideki',
      'lName': 'Ibrahim',
      'email': 'hideki.ibrahim@example.com',
      'gmail_id': '1010',
      'role': 'driver',
      'password': 'Hideki@123'
    },
    {
      'fName': 'Ramesh',
      'lName': 'Krishnan',
      'email': 'ramesh.krishnan@example.com',
      'gmail_id': '65432',
      'role': 'driver',
      'password': 'Ramesh@123'
    },
    {
      'fName': 'Asuka',
      'lName': 'Bose',
      'email': 'asuka.bose@example.com',
      'gmail_id': '98765',
      'role': 'user',
      'password': 'Asuka@123'
    }
  ]
  

const bulkInsertUsers = async () => {
  for (const userObj of data) {
    try {
      const { fName, lName, email, gmail_id, password, role } = userObj

      // Check if the user with the same email or gmail_id already exists
      const existingUser = await User.findOne({
        where: {
          [Sequelize.Op.or]: [{ email }, { gmail_id }],
        },
      })

      if (existingUser) {
        console.log(`User with email ${email} or gmail_id ${gmail_id} already exists. Skipping...`)
        continue
      }

      // Hash the password
      const hashPassword = await bcrypt.hash(password, 10)

      // Create a user object
      const newUser = {
        fName,
        lName,
        email,
        gmail_id: '',
        password: hashPassword,
        role,
      }

      if (gmail_id) {
        newUser.gmail_id = gmail_id
      }

      // Create user in the database
      const user = await User.create(newUser)

      // Generate a token for the user
      const token = generateToken(user)

      console.log(`User with email ${email} created successfully. Token: ${token}`)
    } catch (error) {
      console.error(`Error creating user: ${error.message}`)
    }
  }
}

bulkInsertUsers()
