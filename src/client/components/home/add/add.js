import './add.css';
const add = {
    init () {
        xtag.create('x-add', class extends XTagElement {
            constructor () {
                super();
            }
            '::template(true)' () {
                return `
                    <form>
                        <div class="form-group">
                            <label for="username">用户名</label>
                            <input type="text" class="form-control" id="username" placeholder="请输入用户名">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" placeholder="请输入密码">
                        </div>
                        <button type="submit" class="btn btn-default">提交</button>
                    </form>
                `;
            }
            'click::event' () {
                alert('has click ....');
            }
        });
    }
};
export default add;