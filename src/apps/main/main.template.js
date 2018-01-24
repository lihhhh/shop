import styles from './main.css'; 
debugger
console.log(styles);
module.exports = `
<div>
    <ul class="editorList-ul">
        <li ng-repeat="item in editorList track by $index">{{item.name}}</li>
    </ul>
</div>
`