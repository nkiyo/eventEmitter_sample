const EventEmitter = require('events').EventEmitter;

const doneFunc1 = (arg1, arg2) => {
    console.log(`df1 arg1=${arg1}, arg2=${arg2}`); // => foo bar => faa boo => foo2 bar2
};
const doneFunc2 = (arg1) => {
    console.log(`df2 arg1=${arg1}`); // => foo => faa
};

const func = () => {
    let ev = new EventEmitter;
    console.log('in func');
    setTimeout(() => {
        ev.emit('done', 'foo', 'bar');
        ev.emit('done', 'faa', 'boo');
        ev.removeListener('done', doneFunc2); // 以後、df2は動かない
        ev.emit('done', 'foo2', 'bar2');
        ev.removeAllListeners('done'); // 以後、どの出力も出ない
        ev.emit('done', 'foo3', 'bar3');
        ev.emit('done', 'foo3', 'bar3');
        ev.emit('done', 'foo3', 'bar3');
    }, 1000);
    return ev;
};

let ev = func();
ev.on('done', doneFunc1);
ev.on('done', doneFunc2);
ev.prependListener('done', () => {
    console.log('prependListener done'); // ev.on('done')の前にコールされる
});
ev.prependOnceListener('done', () => {
    console.log('prependOnceListener done'); // ev.prependListener('done')の前に１回だけコールされる
});

console.log(`${ev.eventNames()}`);
