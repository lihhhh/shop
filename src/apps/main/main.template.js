import styles from './main.css'; 
module.exports = `
<div>
    <ul class="editorList-ul">
        <li ng-repeat="item in editorList track by $index">{{item.name}}</li>
    </ul>
</div>
`