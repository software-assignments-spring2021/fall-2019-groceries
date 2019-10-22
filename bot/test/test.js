var assert = require('assert');
var funct = require('../src/index')
describe('Helper Functions', function(){
    var test_list = ['hello', 'how', 'are', 'you', 'doing']
    var test_decider = 0
    var test_sum = 28
    var test_sum_array = [1,2,3,4,5,6,7]
    var test_line = 'Wow, does that work?'
    var str1 ='abc'
    var str2 ='xyz'
    var test1 = funct.build_list(test_list,test_decider)
    test_decider = 1
    var test2 = funct.build_list(test_list,test_decider)
    var test3 = funct.summarize(test_sum_array)
    var test4 = funct.compare_str(str1,str1)
    var test5 = funct.compare_str(str1, str2)
    var test6 = funct.parse_entry(test_line)
    var test7 = funct.summarize(str1)
    var test8 = funct.build_list(3,str1)
    var test9 = funct.summarize(str1)
    var test10 = funct.parse_entry(test_sum)
    
    describe('List Building', function(){
        it('builds the list correctly',function(){

            assert.equal(test1,'Command list: \n/hello \n/how \n/are \n/you \n/doing \n');
        })
        it('decides correctly',function(){

            assert.equal(test2,'Groceries list: \n*hello \n*how \n*are \n*you \n*doing \n');
        })
        it('detects faulty entries',function(){
            assert.equal(test8,false);
        })
    });
    describe('Sums itesm', function(){
        it('produces correct sum',function(){

            assert.equal(test3,test_sum);
        })
        it('detects faulty entries',function(){
            assert.equal(test7,false);
        })
    });
    describe('Compars strings', function(){
        it('decides correctly',function(){

            assert.equal(test4,true);
        })
        it('decides correctly',function(){

            assert.equal(test5,false);
        })
        it('detects faulty entries',function(){
            assert.equal(test9,false);
        })
    });
    describe('Parses entry', function(){
        it('produces correct parsed array',function(){
            var tes =['Wow,', ' does', ' that', ' work?'] 
            assert.deepEqual(test6,tes)
        })
        it('detects faulty entries',function(){
            assert.equal(test10,false);
        })
    });

});