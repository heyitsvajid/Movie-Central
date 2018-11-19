package com.netflix.app.service;

import ch.qos.logback.core.net.SyslogOutputStream;
import org.springframework.stereotype.Service;

import com.netflix.app.model.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@Service
public class ObjectService{

    @PersistenceContext
    private EntityManager em;

    public List getUsersTest(){
        List<User> results = em.createNativeQuery("SELECT * FROM user",User.class).getResultList();
        return results;
    }
/*

    public List<ProjectDetail> getUserBidProjects(long userId){
        String query="select c.name,sub1.* from (select a.id,a.employer_id,a.title,a.main_skill_id,a.budget_range,a.budget_period," +
                "b.bid_amount,b.bid_status,b.user_id,COALESCE(avg(b.bid_amount),0) as average ,count(b.project_id) as " +
                "count from project a left outer join bid b on a.id=b.project_id group by a.id,b.user_id) as " +
                "sub1,user c where c.id=sub1.employer_id and sub1.employer_id!="+ userId+ " and sub1.user_id=" + userId;
        List<Object[]> results = em.createNativeQuery(query).getResultList();
        List<ProjectDetail> processedResults = new ArrayList<>();
        for (Object obj[]:results) {
            System.out.println(obj.toString());
            ProjectDetail projectDetail = new ProjectDetail();
            projectDetail.setEmployerName(obj[0].toString());
            projectDetail.setProjectId(Long.parseLong(obj[1]+""));
            projectDetail.setEmployerId(Long.parseLong(obj[2]+""));
            projectDetail.setProjectTitle(obj[3].toString());
            projectDetail.setProjectSkill(obj[4].toString());
            projectDetail.setProjectBudget(obj[5].toString());
            projectDetail.setProjectPeriod(obj[6].toString());
            projectDetail.setBidAmount(obj[7].toString());
            projectDetail.setBidStatus(obj[8].toString());
            projectDetail.setAverageBid(Double.parseDouble(obj[10]+""));
            projectDetail.setBidCount(Long.parseLong(obj[11]+""));

            processedResults.add(projectDetail);
        }
        return processedResults;
    }
*/
}
