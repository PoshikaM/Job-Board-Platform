class Application:
    def __init__(self, user_id, job_id):
        self.user_id = user_id
        self.job_id = job_id

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "job_id": self.job_id
        }