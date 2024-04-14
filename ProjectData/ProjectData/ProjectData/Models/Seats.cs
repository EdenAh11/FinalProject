namespace ProjectData.Models
{
    public class Seats
    {
        public string _id { get; set; }
        public string _name { get; set; }
        public string _color { get; set; }

        public override string ToString()
        {
            return $"{_id} , {_name} , {_color}";
        }
    }
}
