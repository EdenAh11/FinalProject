namespace ProjectData.Models
{
    public class Users
    {
        public string _username { get; set; }
        public string _password { get; set; }
        public string _class { get; set; }

        public override string ToString()
        {
            return $"{_username} , {_password} , {_class}";
        }
    }
}
