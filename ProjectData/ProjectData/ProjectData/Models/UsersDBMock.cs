namespace ProjectData.Models
{
    public class UsersDBMock
    {
        public static List<Users> users = new List<Users>()
        {
            new Users() {_username = "eden" , _password = "1234" , _class = "analytics"},
            new Users() {_username = "dor" , _password = "5678" , _class = "delivery"},
            new Users() {_username = "shaked" , _password = "4321" , _class = "classified"}
        };
    }
}
