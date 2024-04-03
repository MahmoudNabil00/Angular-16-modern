export class Test {
    constructor(name:any){}
    title = 'TEST'
}

export function test(test?:any){
    console.log(arguments[0]);
    
    let x = new Test(45)
    x.title = 'test'
    let y = new Test(45)
    console.log(y.title)
}