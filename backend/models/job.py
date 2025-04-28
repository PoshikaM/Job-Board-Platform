class Job:
    def __init__(self, job_id, title, description, location, salary):
        self.job_id = job_id
        self.title = title
        self.description = description
        self.location = location
        self.salary = salary

    def to_dict(self):
        return {
            "_id": self.job_id,
            "title": self.title,
            "description": self.description,
            "location": self.location,
            "salary": self.salary
        }