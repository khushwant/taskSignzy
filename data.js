const mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'search'
})

connection.connect(function (err) {
  if (err) {
    console.log('Error!!')
  } else {
    console.log('Server connected!!')
  }
})

var fs_1 = require('fs')
var fs_2 = require('fs')

fs_1.readFile('sqldata/firstnames.out', function (err, data1) {
    if (err) {
        console.log('Error!!')
    } 
    else 
    {
        var first_names = data1.toString().split('\n')
    }
    var len_1 = first_names.length;
  
    
    fs_2.readFile('sqldata/lastnames.out', function (err, data2) 
    {
        if (err) 
        {
            console.log('Error!!')
        } 
        else 
        {
            var last_names = data2.toString().split('\n')
        }

        var len_2 = last_names.length;
        var batches = [];
        var user_1 = 0;
        var flag = 0;

        var exec_strt = new Date().getTime()
        for (var i = 0; i < len_1; i += 1) 
        {
            for (var j = 0; j < len_2; j += 1) 
            {
                var name = first_names[i]+ ' '+last_names[j]
                var users = [user_1+=1,first_names[i],last_names[j],name]
                batches[flag] = users
                flag += 1
                if (batches.length === 18000 || (len_1-1)*(len_2-1)==  i*j) 
                {
                    connection.query('INSERT INTO user VALUES ?', [batches], function (err, result) {
                        if (err) 
                        {
                            throw (err)
                        } 
                        else 
                        {
                            console.log('batch_inserted')
                        }
                    })
                    console.log('working')
                    flag = 0
                    batches = []
                  //console.log(flag+' '+batches)
                }
            }
        }

        var exec_end = new Date().getTime() 
        console.log('Execution time: ', exec_end - exec_strt)
  })
})
